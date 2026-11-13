/**
 * UI Framework — Form Interactions
 */

import { qsa, on } from '../core.js';

/**
 * Password visibility toggle
 */
export function initPasswordToggles(root = document) {
  qsa('[data-password-toggle]', root).forEach((btn) => {
    const wrapper = btn.closest('.relative') || btn.parentElement;
    const input = wrapper?.querySelector('[data-password-input]') || wrapper?.querySelector('input[type="password"], input[type="text"]');
    if (!input) return;

    const iconShow = btn.querySelector('[data-icon-show]');
    const iconHide = btn.querySelector('[data-icon-hide]');

    on(btn, 'click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      if (iconShow && iconHide) {
        iconShow.classList.toggle('hidden', isPassword);
        iconHide.classList.toggle('hidden', !isPassword);
      }
    });
  });
}

/**
 * Simple form validation demo (optional)
 */
export function initFormValidation(form) {
  if (!form) return;

  on(form, 'submit', (e) => {
    e.preventDefault();
    // Basic demo – real validation would be more thorough
    const required = qsa('[required]', form);
    let valid = true;
    required.forEach((el) => {
      if (!el.value.trim()) {
        el.setAttribute('aria-invalid', 'true');
        valid = false;
      } else {
        el.removeAttribute('aria-invalid');
      }
    });
    if (valid) {
      // Demo success
      console.info('[UI Framework] Form submitted successfully (demo)');
    }
  });
}

export function initForms(root = document) {
  initPasswordToggles(root);
}
