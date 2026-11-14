/**
 * UI Framework — Dropdown
 * Click + keyboard support. Closes on outside click / Escape.
 */

import { qs, qsa, on } from '../core.js';

let openDropdown = null;

function close(dropdown) {
  if (!dropdown) return;
  const menu = dropdown.querySelector('[data-dropdown-menu]');
  const trigger = dropdown.querySelector('[data-dropdown-toggle]');
  if (menu) {
    menu.classList.add('hidden');
    menu.setAttribute('aria-hidden', 'true');
  }
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
  if (openDropdown === dropdown) openDropdown = null;
}

function open(dropdown) {
  // Close any other open dropdown
  if (openDropdown && openDropdown !== dropdown) close(openDropdown);

  const menu = dropdown.querySelector('[data-dropdown-menu]');
  const trigger = dropdown.querySelector('[data-dropdown-toggle]');
  if (menu) {
    menu.classList.remove('hidden');
    menu.setAttribute('aria-hidden', 'false');
  }
  if (trigger) trigger.setAttribute('aria-expanded', 'true');
  openDropdown = dropdown;

  // Focus first item
  const firstItem = menu?.querySelector('[role="menuitem"]');
  if (firstItem) firstItem.focus();
}

export function initDropdowns(root = document) {
  qsa('[data-dropdown]', root).forEach((dropdown) => {
    const trigger = dropdown.querySelector('[data-dropdown-toggle]');
    const menu = dropdown.querySelector('[data-dropdown-menu]');
    if (!trigger || !menu) return;

    on(trigger, 'click', (e) => {
      e.stopPropagation();
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (isOpen) close(dropdown);
      else open(dropdown);
    });

    // Keyboard on trigger
    on(trigger, 'keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(dropdown);
      }
    });

    // Keyboard inside menu
    on(menu, 'keydown', (e) => {
      const items = qsa('[role="menuitem"]', menu);
      const index = items.indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(index + 1) % items.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(index - 1 + items.length) % items.length]?.focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        close(dropdown);
        trigger.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
      }
    });
  });

  // Outside click
  on(document, 'click', () => {
    if (openDropdown) close(openDropdown);
  });

  // Global Escape
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && openDropdown) {
      const trigger = openDropdown.querySelector('[data-dropdown-toggle]');
      close(openDropdown);
      trigger?.focus();
    }
  });
}
