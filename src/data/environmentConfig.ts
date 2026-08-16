export type EnvParams = {
  intensity?: number; // 0.0 - 1.0
  dustDensity?: number; // 0.0 - 1.0
  dustSpeed?: number; // multiplier
  hazeColor?: string;
  hazeOpacity?: number;
};

export type EnvironmentConfig = {
  [memoryId: string]: {
    type: 'warm-haze' | 'night' | 'heat' | 'rain' | 'field' | 'none';
    params?: EnvParams;
  };
};

export const environmentConfig: EnvironmentConfig = {
  'pind-di-shaam': {
    type: 'warm-haze',
    params: { intensity: 0.7, dustDensity: 0.12, dustSpeed: 0.9, hazeColor: '255,216,155', hazeOpacity: 0.28 }
  },
  'saddi-gali': {
    type: 'warm-haze',
    params: { intensity: 0.78, dustDensity: 0.18, dustSpeed: 1.05, hazeColor: '244,200,140', hazeOpacity: 0.32 }
  }
  ,
  'raat-da-pind': {
    type: 'night',
    params: { intensity: 0.5, dustDensity: 0.06, dustSpeed: 0.6, hazeColor: '180,200,230', hazeOpacity: 0.14 }
  },
  'garmiyan': {
    type: 'heat',
    params: { intensity: 0.5, dustDensity: 0.08, dustSpeed: 0.7, hazeColor: '255,230,190', hazeOpacity: 0.12 }
  },
  'barsaat': {
    type: 'rain',
    params: { intensity: 0.6, dustDensity: 0.04, dustSpeed: 0.9, hazeColor: '210,220,230', hazeOpacity: 0.16 }
  },
  'khetan-wich': {
    type: 'field',
    params: { intensity: 0.48, dustDensity: 0.1, dustSpeed: 0.6, hazeColor: '245,240,210', hazeOpacity: 0.14 }
  }
};
