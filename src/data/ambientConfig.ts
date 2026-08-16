export type AmbientConfigEntry = {
  ambientTrack?: string; // local path to audio file (may not exist yet)
  defaultVolume?: number; // 0.0 - 1.0
  fadeDurationMs?: number; // milliseconds
};

export const ambientConfig: Record<string, AmbientConfigEntry> = {
  'pind-di-shaam': { ambientTrack: '/assets/audio/ambient/pind-di-shaam.mp3', defaultVolume: 0.12, fadeDurationMs: 1800 },
  'raat-da-pind': { ambientTrack: '/assets/audio/ambient/raat-da-pind.mp3', defaultVolume: 0.10, fadeDurationMs: 2000 },
  'garmiyan': { ambientTrack: '/assets/audio/ambient/garmiyan.mp3', defaultVolume: 0.10, fadeDurationMs: 1800 },
  'barsaat': { ambientTrack: '/assets/audio/ambient/barsaat.mp3', defaultVolume: 0.12, fadeDurationMs: 2200 },
  'khetan-wich': { ambientTrack: '/assets/audio/ambient/khetan-wich.mp3', defaultVolume: 0.11, fadeDurationMs: 1800 },
  'saddi-gali': { ambientTrack: '/assets/audio/ambient/saddi-gali.mp3', defaultVolume: 0.13, fadeDurationMs: 1800 }
};
