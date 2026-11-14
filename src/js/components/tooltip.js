/**
 * UI Framework — Tooltip
 * Lightweight tooltips using data attributes. Shows on hover/focus.
 */

import { qsa, on } from '../core.js';

export function initTooltips(root = document) {
  qsa('[data-tooltip]', root).forEach((el) => {
    const text = el.getAttribute('data-tooltip');
    if (!text) return;

    let tip = null;

    function show() {
      if (tip) return;
      tip = document.createElement('div');
      tip.className = 'absolute z-[1070] px-2.5 py-1.5 text-xs font-medium text-white bg-secondary-900 dark:bg-secondary-700 rounded-md shadow-lg pointer-events-none whitespace-nowrap';
      tip.setAttribute('role', 'tooltip');
      tip.textContent = text;
      document.body.appendChild(tip);

      const rect = el.getBoundingClientRect();
      const tipRect = tip.getBoundingClientRect();
      const placement = el.getAttribute('data-tooltip-placement') || 'top';

      let top, left;
      if (placement === 'bottom') {
        top = rect.bottom + 8 + window.scrollY;
        left = rect.left + rect.width / 2 - tipRect.width / 2 + window.scrollX;
      } else if (placement === 'left') {
        top = rect.top + rect.height / 2 - tipRect.height / 2 + window.scrollY;
        left = rect.left - tipRect.width - 8 + window.scrollX;
      } else if (placement === 'right') {
        top = rect.top + rect.height / 2 - tipRect.height / 2 + window.scrollY;
        left = rect.right + 8 + window.scrollX;
      } else {
        // top
        top = rect.top - tipRect.height - 8 + window.scrollY;
        left = rect.left + rect.width / 2 - tipRect.width / 2 + window.scrollX;
      }

      tip.style.top = `${Math.max(4, top)}px`;
      tip.style.left = `${Math.max(4, left)}px`;
    }

    function hide() {
      if (tip) {
        tip.remove();
        tip = null;
      }
    }

    on(el, 'mouseenter', show);
    on(el, 'mouseleave', hide);
    on(el, 'focus', show);
    on(el, 'blur', hide);
  });
}
