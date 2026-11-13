/**
 * UI Framework — Main JavaScript Entry
 */

import { initTheme } from './core.js';
import { initForms } from './components/forms.js';
import { initFeedback } from './components/feedback.js';
import { initNavigation } from './components/navigation.js';

// Initialize theme as early as possible
initTheme();

// Initialize interactive components
function init() {
  initForms();
  initFeedback();
  initNavigation();
  console.info('[UI Framework] Components initialized');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export * from './core.js';
export { initForms } from './components/forms.js';
export { initFeedback } from './components/feedback.js';
export { initNavigation } from './components/navigation.js';
