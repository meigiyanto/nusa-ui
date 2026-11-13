/**
 * UI Framework — Feedback Interactions (Alert dismiss, etc.)
 */

import { qsa, on } from '../core.js';

export function initAlertDismiss(root = document) {
  qsa('[data-alert-dismiss]', root).forEach((btn) => {
    on(btn, 'click', () => {
      const alert = btn.closest('[role="alert"]') || btn.closest('.rounded-lg');
      if (!alert) return;
      alert.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      alert.style.opacity = '0';
      alert.style.transform = 'translateY(-4px)';
      setTimeout(() => alert.remove(), 200);
    });
  });
}

export function initFeedback(root = document) {
  initAlertDismiss(root);
}
