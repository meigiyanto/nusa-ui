/**
 * UI Framework — Drawer
 * Side panel (left/right) with overlay, focus trap, Escape close.
 */

import { qs, qsa, on, trapFocus } from '../core.js';

const openDrawers = new Set();

export function openDrawer(drawer) {
  if (!drawer || openDrawers.has(drawer)) return;

  drawer._previouslyFocused = document.activeElement;
  drawer.classList.remove('hidden');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const panel = drawer.querySelector('[data-drawer-panel]');
  const backdrop = drawer.querySelector('[data-drawer-backdrop]');

  requestAnimationFrame(() => {
    if (backdrop) {
      backdrop.classList.add('opacity-100');
      backdrop.classList.remove('opacity-0');
    }
    if (panel) {
      panel.classList.remove('translate-x-full', '-translate-x-full');
      panel.classList.add('translate-x-0');
    }
  });

  drawer._releaseFocus = trapFocus(drawer);
  openDrawers.add(drawer);

  const focusable = drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable.length) focusable[0].focus();
}

export function closeDrawer(drawer) {
  if (!drawer || !openDrawers.has(drawer)) return;

  const panel = drawer.querySelector('[data-drawer-panel]');
  const backdrop = drawer.querySelector('[data-drawer-backdrop]');
  const side = drawer.getAttribute('data-drawer-side') || 'right';

  if (backdrop) {
    backdrop.classList.add('opacity-0');
    backdrop.classList.remove('opacity-100');
  }
  if (panel) {
    panel.classList.remove('translate-x-0');
    panel.classList.add(side === 'left' ? '-translate-x-full' : 'translate-x-full');
  }

  setTimeout(() => {
    drawer.classList.add('hidden');
    drawer.setAttribute('aria-hidden', 'true');
    openDrawers.delete(drawer);

    if (openDrawers.size === 0) {
      document.body.style.overflow = '';
    }

    if (typeof drawer._releaseFocus === 'function') drawer._releaseFocus();
    if (drawer._previouslyFocused?.focus) drawer._previouslyFocused.focus();
  }, 300);
}

export function initDrawers(root = document) {
  qsa('[data-drawer-open]', root).forEach((btn) => {
    on(btn, 'click', () => {
      const id = btn.getAttribute('data-drawer-open');
      const drawer = qs(`#${id}`);
      if (drawer) openDrawer(drawer);
    });
  });

  qsa('[data-drawer-close]', root).forEach((btn) => {
    on(btn, 'click', () => {
      const drawer = btn.closest('[data-drawer]') || btn.closest('[role="dialog"]');
      if (drawer) closeDrawer(drawer);
    });
  });

  qsa('[data-drawer-backdrop]', root).forEach((backdrop) => {
    on(backdrop, 'click', () => {
      const drawer = backdrop.closest('[data-drawer]');
      if (drawer) closeDrawer(drawer);
    });
  });

  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && openDrawers.size > 0) {
      const last = [...openDrawers].pop();
      if (last) closeDrawer(last);
    }
  });
}
