
/// <reference types="vite/client" />

interface Window {
  UnicornStudio?: {
    isInitialized: boolean;
    init: () => void;
  };
}
