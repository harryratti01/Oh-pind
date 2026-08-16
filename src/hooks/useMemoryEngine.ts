import { useCallback, useRef, useState } from 'react';
import { memories } from '@/data/memories';

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQueue(exclude: number): number[] {
  const indices = memories.map((_, index) => index).filter((index) => index !== exclude);
  return shuffle(indices);
}

function buildCycle(exclude: number): number[] {
  const full = shuffle(memories.map((_, index) => index));
  if (full[0] === exclude) {
    return [...full.slice(1), full[0]];
  }
  return full;
}

export function useMemoryEngine() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const queueRef = useRef<number[]>(buildQueue(0));
  const lockRef = useRef(false);

  const advance = useCallback(() => {
    if (lockRef.current) return;
    lockRef.current = true;
    setTransitioning(true);

    window.setTimeout(() => {
      setActiveIndex((current) => {
        let queue = queueRef.current;
        if (queue.length === 0) {
          queue = buildCycle(current);
        }
        const nextIndex = queue[0];
        queueRef.current = queue.slice(1);
        return nextIndex;
      });
      setTransitioning(false);
      lockRef.current = false;
    }, 1000);
  }, []);

  const previous = useCallback(() => {
    if (lockRef.current) return;
    lockRef.current = true;
    setTransitioning(true);

    window.setTimeout(() => {
      setActiveIndex((current) => (current - 1 + memories.length) % memories.length);
      setTransitioning(false);
      lockRef.current = false;
    }, 1000);
  }, []);

  return { activeIndex, transitioning, advance, previous };
}
