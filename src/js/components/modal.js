/**
 * UI Framework — Modal
 * Accessible modal with focus trap, Escape close, backdrop click.
 */

import { qs, qsa, on, trapFocus, uid } from '../core.js';

const openModals = new Set();

function getFocusable(container) {
  return qsa(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    container
  ).filter((el) => el.offsetParent !== null);
}

export function openModal(modal) {
  if (!modal || openModals.has(modal)) return;

  const previouslyFocused = document.activeElement;
  modal._previouslyFocused = previouslyFocused;

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Focus first focusable or the modal itself
  const focusable = getFocusable(modal);
  if (focusable.length) {
    focusable[0].focus();
  } else {
    modal.focus();
  }

  modal._releaseFocus = trapFocus(modal);
  openModals.add(modal);

  // Backdrop animation helper
  const backdrop = modal.querySelector('[data-modal-backdrop]');
  if (backdrop) {
    requestAnimationFrame(() => {
      backdrop.classList.add('opacity-100');
      backdrop.classList.remove('opacity-0');
    });
  }

  const panel = modal.querySelector('[data-modal-panel]');
  if (panel) {
    requestAnimationFrame(() => {
      panel.classList.add('opacity-100', 'scale-100');
      panel.classList.remove('opacity-0', 'scale-95');
    });
  }
}

export function closeModal(modal) {
  if (!modal || !openModals.has(modal)) return;

  const backdrop = modal.querySelector('[data-modal-backdrop]');
  const panel = modal.querySelector('[data-modal-panel]');

  if (backdrop) {
    backdrop.classList.add('opacity-0');
    backdrop.classList.remove('opacity-100');
  }
  if (panel) {
    panel.classList.add('opacity-0', 'scale-95');
    panel.classList.remove('opacity-100', 'scale-100');
  }

  setTimeout(() => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    openModals.delete(modal);

    if (openModals.size === 0) {
      document.body.style.overflow = '';
    }

    if (typeof modal._releaseFocus === 'function') {
      modal._releaseFocus();
    }

    if (modal._previouslyFocused && typeof modal._previouslyFocused.focus === 'function') {
      modal._previouslyFocused.focus();
    }
  }, 200);
}

export function initModals(root = document) {
  // Open triggers
  qsa('[data-modal-open]', root).forEach((btn) => {
    on(btn, 'click', () => {
      const id = btn.getAttribute('data-modal-open');
      const modal = id ? qs(`#${id}`) : btn.closest('[data-modal]')?.querySelector('[role="dialog"]');
      if (modal) openModal(modal);
    });
  });

  // Close triggers
  qsa('[data-modal-close]', root).forEach((btn) => {
    on(btn, 'click', () => {
      const modal = btn.closest('[role="dialog"]') || btn.closest('[data-modal]');
      if (modal) closeModal(modal);
    });
  });

  // Backdrop click
  qsa('[data-modal-backdrop]', root).forEach((backdrop) => {
    on(backdrop, 'click', (e) => {
      if (e.target === backdrop) {
        const modal = backdrop.closest('[role="dialog"]');
        if (modal) closeModal(modal);
      }
    });
  });

  // Escape key
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && openModals.size > 0) {
      const last = [...openModals].pop();
      if (last) closeModal(last);
    }
  });
}

export function createModal({ id, title, content, size = 'md' } = {}) {
  const modalId = id || uid('modal');
  // Utility for dynamic creation if needed later
  return modalId;
}
