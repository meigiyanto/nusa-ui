/**
 * UI Framework — Accordion
 * Single or multiple open panels. Keyboard accessible.
 */

import { qs, qsa, on } from '../core.js';

export function initAccordions(root = document) {
  qsa('[data-accordion]', root).forEach((accordion) => {
    const allowMultiple = accordion.hasAttribute('data-accordion-multiple');
    const triggers = qsa('[data-accordion-trigger]', accordion);

    triggers.forEach((trigger) => {
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? qs(`#${panelId}`) : trigger.nextElementSibling;
      if (!panel) return;

      // Initial state
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      panel.hidden = !isOpen;
      panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '0px';

      on(trigger, 'click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';

        if (!allowMultiple) {
          // Close others
          triggers.forEach((other) => {
            if (other === trigger) return;
            other.setAttribute('aria-expanded', 'false');
            const otherPanelId = other.getAttribute('aria-controls');
            const otherPanel = otherPanelId ? qs(`#${otherPanelId}`) : other.nextElementSibling;
            if (otherPanel) {
              otherPanel.hidden = true;
              otherPanel.style.maxHeight = '0px';
            }
            const icon = other.querySelector('[data-accordion-icon]');
            if (icon) icon.classList.remove('rotate-180');
          });
        }

        trigger.setAttribute('aria-expanded', String(!expanded));
        panel.hidden = expanded;
        panel.style.maxHeight = expanded ? '0px' : panel.scrollHeight + 'px';

        const icon = trigger.querySelector('[data-accordion-icon]');
        if (icon) icon.classList.toggle('rotate-180', !expanded);
      });
    });
  });
}
