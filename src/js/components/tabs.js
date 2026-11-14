/**
 * UI Framework — Tabs
 * Accessible tabs with keyboard navigation (Arrow keys, Home/End).
 */

import { qs, qsa, on } from '../core.js';

export function initTabs(root = document) {
  qsa('[data-tabs]', root).forEach((tablist) => {
    const tabs = qsa('[role="tab"]', tablist);
    const panels = qsa('[role="tabpanel"]', tablist.closest('[data-tabs-root]') || document);

    function activate(tab) {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        t.classList.toggle('border-primary-600', selected);
        t.classList.toggle('text-primary-600', selected);
        t.classList.toggle('border-transparent', !selected);
        t.classList.toggle('text-muted', !selected);
      });

      const panelId = tab.getAttribute('aria-controls');
      panels.forEach((panel) => {
        const isActive = panel.id === panelId;
        panel.classList.toggle('hidden', !isActive);
        panel.hidden = !isActive;
      });
    }

    tabs.forEach((tab) => {
      on(tab, 'click', () => activate(tab));

      on(tab, 'keydown', (e) => {
        const index = tabs.indexOf(tab);
        let next = null;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          next = tabs[(index + 1) % tabs.length];
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          next = tabs[(index - 1 + tabs.length) % tabs.length];
        } else if (e.key === 'Home') {
          e.preventDefault();
          next = tabs[0];
        } else if (e.key === 'End') {
          e.preventDefault();
          next = tabs[tabs.length - 1];
        }

        if (next) {
          next.focus();
          activate(next);
        }
      });
    });

    // Ensure initial state
    const selected = tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0];
    if (selected) activate(selected);
  });
}
