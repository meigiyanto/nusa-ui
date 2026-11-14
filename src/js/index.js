/**
 * UI Framework — Main JavaScript Entry
 */

import { initTheme } from './core.js';
import { initForms } from './components/forms.js';
import { initFeedback } from './components/feedback.js';
import { initNavigation } from './components/navigation.js';
import { initModals } from './components/modal.js';
import { initDrawers } from './components/drawer.js';
import { initTabs } from './components/tabs.js';
import { initAccordions } from './components/accordion.js';
import { initDropdowns } from './components/dropdown.js';
import { initTooltips } from './components/tooltip.js';
import { toast } from './components/toast.js';

// Initialize theme as early as possible
initTheme();

// Initialize interactive components
function init() {
  initForms();
  initFeedback();
  initNavigation();
  initModals();
  initDrawers();
  initTabs();
  initAccordions();
  initDropdowns();
  initTooltips();
  console.info('[UI Framework] All components initialized');
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
export { initModals, openModal, closeModal } from './components/modal.js';
export { initDrawers, openDrawer, closeDrawer } from './components/drawer.js';
export { initTabs } from './components/tabs.js';
export { initAccordions } from './components/accordion.js';
export { initDropdowns } from './components/dropdown.js';
export { initTooltips } from './components/tooltip.js';
export { toast } from './components/toast.js';
