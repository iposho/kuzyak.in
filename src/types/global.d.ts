declare global {
  interface Window {
    ym: (id: string, action: string, options?: Record<string, unknown>) => void;
  }
}

export {};
