import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ui');

  if (!container) {
    return;
  }

  const root = createRoot(container);
  root.render(<App />);
});
