declare global {
  interface Window {
    ym: (id: string, action: string, options?: any) => void;
  }
}

// Feature Toggle типы
export interface FeatureToggleConfig {
  navigation: boolean;
  debug: boolean;
}

export type FeatureToggleKey = keyof FeatureToggleConfig;

export {};
