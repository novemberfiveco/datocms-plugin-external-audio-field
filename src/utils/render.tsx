import React, { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

//https://stackoverflow.com/questions/71792005/react-18-you-are-calling-reactdomclient-createroot-on-a-container-that-has-a

let container: HTMLElement | null = null;

export function render(component: React.ReactNode): void {
  if (!container) {
    container = document.getElementById('root');
    if (container) {
      const root = createRoot(container);
      root.render(<StrictMode>{component}</StrictMode>);
    }
  }
}
