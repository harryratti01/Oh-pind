import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Pause, Play, Radio, Volume2, VolumeX, X } from 'lucide-react';
import { memories, type Memory } from '@/data/memories';
import { useMemoryEngine } from '@/hooks/useMemoryEngine';

type Parallax = { x: number; y: number };

function App() {
  const { activeIndex, transitioning, advance, previous } = useMemoryEngine();
  const [isPlaying, setIsPlaying] = useState(false);
  const [ambienceOn, setAmbienceOn] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [parallax, setParallax] = useState<Parallax>({ x: 0, y: 0 });
  const memory: Memory = memories[activeIndex];

  const nextMemory = useCallback(() => {
    setIsPlaying(false);
    advance();
  }, [advance]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      setParallax({ x: (event.clientX / window.innerWidth - 0.5) * 5, y: (event.clientY / window.innerHeight - 0.5) * 5 });
    };
    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') { event.preventDefault(); nextMemory(); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
      if (event.key === 'Escape') setSupportOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextMemory]);

  const nextImage = useMemo(() => memories[(activeIndex + 1) % memories.length].image, [activeIndex]);

  return (
    <main className={`memory-app profile-${memory.profile} ${transitioning ? 'is-transitioning' : ''}`}>
      <div className="scene" style={{ '--parallax-x': `${parallax.x}px`, '--parallax-y': `${parallax.y}px`, '--next-image': `url(${nextImage})` } as React.CSSProperties}>
        <img className="scene-image" src={memory.image} alt={memory.imageAlt} />
        <div className="scene-tint" />
        <div className="scene-vignette" />
        <div className="scene-dust" aria-hidden="true" />
        <div className="scene-scanlines" aria-hidden="true" />
      </div>

      <header className="topbar">
        <div className="brand-lockup"><span>OH PIND</span><small>ARCHIVE OF ORDINARY DAYS</small></div>
        <div className="tagline"><span>ਕੁਝ ਯਾਦਾਂ ਮੁੜ ਕੇ ਨਹੀਂ ਆਉਂਦੀਆਂ।</span><em>Kujh Yaadan Mud Ke Nahi Aundiyan.</em></div>
      </header>

      <section className="memory-caption" aria-live="polite">
        <div className="memory-kicker"><span>{String(activeIndex + 1).padStart(2, '0')} / 06</span><i /> <span>{memory.year} · {memory.time}</span></div>
        <h1>{memory.title}</h1>
        <p className="quote">“{memory.quote}”</p>
        <p className="ambient-line"><span className={`ambient-dot ${ambienceOn ? 'is-on' : ''}`} />{memory.ambient.label}</p>
      </section>

      <div className="control-deck">
        <div className="radio-module" aria-label="Pind Radio">
          <div className="radio-heading"><Radio size={14} strokeWidth={1.5} /><span>PIND RADIO</span><small>{memory.music.youtubeVideoId ? 'CONNECTED' : 'TUNING MEMORY'}</small></div>
          <div className="radio-body">
            <button className="radio-play" aria-label={isPlaying ? 'Pause radio' : 'Play radio'} onClick={() => setIsPlaying((playing) => !playing)}>{isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}</button>
            <div className="radio-track"><strong>{memory.music.title}</strong><span>{memory.music.artist}</span><div className="progress"><i style={{ width: isPlaying ? '36%' : '12%' }} /></div></div>
            <div className="radio-arrows"><button aria-label="Previous memory" onClick={previous}><ChevronLeft size={15} /></button><button aria-label="Next memory" onClick={nextMemory}><ChevronRight size={15} /></button></div>
          </div>
          {!memory.music.youtubeVideoId && <p className="radio-note">Music will play here when the archive tape is connected.</p>}
        </div>

        <div className="actions">
          <button className="ambience-toggle" aria-pressed={ambienceOn} onClick={() => setAmbienceOn((on) => !on)}>{ambienceOn ? <Volume2 size={15} /> : <VolumeX size={15} />}<span>AMBIENCE</span></button>
          <button className="support-button" onClick={() => setSupportOpen(true)}><Heart size={14} /> SUPPORT OH PIND</button>
        </div>
      </div>

      <button className="next-memory" aria-label="Change memory" onClick={nextMemory}><span>↻</span> IK HOR YAAD</button>
      <p className="footer-note">Music is provided through embedded third-party YouTube players. OH PIND does not host, download, or distribute music files. Music and other media remain the property of their respective copyright holders.</p>

      {supportOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSupportOpen(false); }}><section className="support-modal" role="dialog" aria-modal="true" aria-labelledby="support-title"><button className="modal-close" onClick={() => setSupportOpen(false)} aria-label="Close support dialog"><X size={18} /></button><div className="modal-eyebrow">A SMALL NOTE FROM THE PIND</div><h2 id="support-title">KEEP THE PIND ALIVE</h2><p>If this little memory brought something back, you can support the project.</p><div className="qr-placeholder" aria-label="Placeholder QR code"><span className="qr-corner top-left" /><span className="qr-corner top-right" /><span className="qr-corner bottom-left" /><div className="qr-dots" /></div><small>QR PLACEHOLDER · REPLACE IN /PUBLIC/ASSETS/QR</small></section></div>}
    </main>
  );
}

export default App;
