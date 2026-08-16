import React from 'react';
import { useMemoryEngine } from '@/hooks/useMemoryEngine';
import { memories } from '@/data/memories';
import useAmbientAudio from '@/hooks/useAmbientAudio';

const AmbientAudioController: React.FC = () => {
  const { activeIndex } = useMemoryEngine();
  const memory = memories[activeIndex];
  useAmbientAudio(memory?.id);
  return null; // no UI
};

export default AmbientAudioController;
