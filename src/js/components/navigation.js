/**
 * UI Framework — Navigation Interactions
 */

import { qs, qsa, on } from '../core.js';

/**
 * Mobile menu (hamburger) toggle
 */
export function initMobileMenu(root = document) {
  const toggles = qsa('[data-mobile-menu-toggle]', root);
  const menus = qsa('[data-mobile-menu]', root);

  if (toggles.length === 0 || menus.length === 0) return;

  toggles.forEach((toggle, index) => {
    const menu = menus[index] || menus[0];

    on(toggle, 'click', () => {
      const isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden', isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));

      // Optional: lock body scroll when open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on escape
    on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  });
}

/**
 * Simple dropdown (for future use)
 */
export function initDropdowns(root = document) {
  qsa('[data-dropdown-toggle]', root).forEach((toggle) => {
    const menu = toggle.nextElementSibling || qs(`[data-dropdown-menu="${toggle.dataset.dropdownToggle}"]`);
    if (!menu) return;

    on(toggle, 'click', (e) => {
      e.stopPropagation();
      const isOpen = !menu.classList.contains('hidden');
      // Close other dropdowns
      qsa('[data-dropdown-menu]').forEach((m) => m.classList.add('hidden'));
      menu.classList.toggle('hidden', isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Close on outside click
  on(document, 'click', () => {
    qsa('[data-dropdown-menu], [data-dropdown-toggle] + *').forEach((el) => {
      if (el.matches('[data-dropdown-menu]') || el.hasAttribute('data-dropdown-menu')) {
        el.classList.add('hidden');
      }
    });
    qsa('[data-dropdown-toggle]').forEach((t) => t.setAttribute('aria-expanded', 'false'));
  });
}

export function initNavigation(root = document) {
  initMobileMenu(root);
  initDropdowns(root);
}
