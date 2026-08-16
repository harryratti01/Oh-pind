import { useEffect, useRef } from 'react';
import { ambientConfig } from '@/data/ambientConfig';

function safePlay(audio: HTMLAudioElement) {
  // play may return a promise which can reject due to autoplay policies
  const p = audio.play();
  if (p && typeof p.then === 'function') {
    p.catch(() => { /* swallow autoplay rejection; will try again on user interaction */ });
  }
}

export function useAmbientAudio(memoryId: string | undefined) {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadingIntervalRef = useRef<number | null>(null);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    // mark user interaction to allow playback attempts later
    function onFirstInteraction() {
      userInteractedRef.current = true;
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
    }
    window.addEventListener('pointerdown', onFirstInteraction);
    window.addEventListener('keydown', onFirstInteraction);
    return () => {
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
    };
  }, []);

  useEffect(() => {
    const cfg = memoryId ? ambientConfig[memoryId] : undefined;
    const src = cfg?.ambientTrack;
    const defaultVolume = cfg?.defaultVolume ?? 0.12;
    const fadeMs = cfg?.fadeDurationMs ?? 1800;

    let newAudio: HTMLAudioElement | null = null;
    const oldAudio = currentAudioRef.current;

    // helper to clear any fading interval
    function clearFading() {
      if (fadingIntervalRef.current) {
        clearInterval(fadingIntervalRef.current);
        fadingIntervalRef.current = null;
      }
    }

    // If there's no src for this memory, just fade out and stop any existing audio
    if (!src) {
      if (oldAudio) {
        // fade out
        const startVol = oldAudio.volume;
        const steps = 20;
        const stepMs = Math.max(20, Math.floor(fadeMs / steps));
        let step = 0;
        clearFading();
        fadingIntervalRef.current = window.setInterval(() => {
          step++;
          const t = step / steps;
          oldAudio.volume = Math.max(0, startVol * (1 - t));
          if (step >= steps) {
            clearFading();
            try { oldAudio.pause(); } catch {}
            try { oldAudio.src = ''; } catch {}
            currentAudioRef.current = null;
          }
        }, stepMs) as unknown as number;
      }
      return undefined;
    }

    // create new audio element for the new track
    try {
      newAudio = new Audio(src);
      newAudio.loop = true;
      newAudio.preload = 'auto';
      newAudio.volume = 0;
      // Do not throw if file missing; play attempt may fail.
    } catch (e) {
      newAudio = null;
    }

    // Crossfade: fade out oldAudio, fade in newAudio
    const fade = () => {
      clearFading();
      const steps = 20;
      const stepMs = Math.max(20, Math.floor(fadeMs / steps));
      let step = 0;
      const targetVol = defaultVolume;
      if (newAudio) {
        // try to play (may be blocked)
        try { safePlay(newAudio); } catch {}
      }

      fadingIntervalRef.current = window.setInterval(() => {
        step++;
        const t = step / steps;
        // fade out old
        if (oldAudio) {
          try { oldAudio.volume = Math.max(0, (1 - t) * (oldAudio.volume)); } catch {}
        }
        // fade in new
        if (newAudio) {
          try { newAudio.volume = Math.min(targetVol, targetVol * t); } catch {}
        }
        if (step >= steps) {
          clearFading();
          // finalize volumes
          if (newAudio) newAudio.volume = targetVol;
          if (oldAudio) {
            try { oldAudio.pause(); } catch {}
            try { oldAudio.src = ''; } catch {}
          }
          currentAudioRef.current = newAudio;
        }
      }, stepMs) as unknown as number;
    };

    // If user hasn't interacted yet, we still create the audio element but don't call play(), but we still set currentAudioRef so that later interaction can trigger it.
    if (newAudio) {
      currentAudioRef.current = newAudio;
      if (userInteractedRef.current) {
        safePlay(newAudio);
        fade();
      } else {
        // wait for first user interaction to start fading in
        const onFirst = () => {
          try { safePlay(newAudio!); } catch {}
          fade();
          window.removeEventListener('pointerdown', onFirst);
          window.removeEventListener('keydown', onFirst);
        };
        window.addEventListener('pointerdown', onFirst, { once: true });
        window.addEventListener('keydown', onFirst, { once: true });
      }
    }

    return () => {
      // cleanup for this effect (memory change/unmount)
      clearFading();
      if (newAudio && newAudio !== currentAudioRef.current) {
        try { newAudio.pause(); } catch {}
        try { newAudio.src = ''; } catch {}
      }
    };
  }, [memoryId]);

  useEffect(() => {
    // cleanup on unmount
    return () => {
      if (fadingIntervalRef.current) {
        clearInterval(fadingIntervalRef.current);
        fadingIntervalRef.current = null;
      }
      const a = currentAudioRef.current;
      if (a) {
        try { a.pause(); } catch {}
        try { a.src = ''; } catch {}
      }
      currentAudioRef.current = null;
    };
  }, []);
}

export default useAmbientAudio;
