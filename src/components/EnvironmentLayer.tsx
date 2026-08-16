import React, { useMemo } from 'react';
import { environmentConfig } from '@/data/environmentConfig';

export type EnvironmentLayerProps = {
  memoryId: string;
};

export const EnvironmentLayer: React.FC<EnvironmentLayerProps> = ({ memoryId }) => {
  const cfg = environmentConfig[memoryId];
  const dataAttrs = useMemo(() => {
    if (!cfg) return {};
    const p = cfg.params || {};
    return {
      'data-env-type': cfg.type,
      'data-env-intensity': String(p.intensity ?? 0.6),
      'data-env-dust-density': String(p.dustDensity ?? 0.12),
      'data-env-dust-speed': String(p.dustSpeed ?? 1),
      'data-env-haze-color': String(p.hazeColor ?? '255,220,180'),
      'data-env-haze-opacity': String(p.hazeOpacity ?? 0.28)
    } as Record<string,string>;
  }, [cfg]);

  return (
    <div className="environment-layer" aria-hidden="true" {...dataAttrs} />
  );
};

export default EnvironmentLayer;
