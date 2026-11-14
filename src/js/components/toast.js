/**
 * UI Framework — Toast / Snackbar
 * Lightweight notification system.
 */

import { createElement, uid } from '../core.js';

let container = null;

function ensureContainer() {
  if (container) return container;
  container = document.createElement('div');
  container.id = 'ui-toast-container';
  container.className = 'fixed bottom-4 right-4 z-[1080] flex flex-col gap-3 w-full max-w-sm pointer-events-none';
  container.setAttribute('aria-live', 'polite');
  container.setAttribute('aria-relevant', 'additions');
  document.body.appendChild(container);
  return container;
}

const variants = {
  info: {
    bg: 'bg-info-50 dark:bg-info-950 border-info-200 dark:border-info-800',
    icon: 'text-info-600 dark:text-info-400',
    text: 'text-info-800 dark:text-info-200',
  },
  success: {
    bg: 'bg-success-50 dark:bg-success-950 border-success-200 dark:border-success-800',
    icon: 'text-success-600 dark:text-success-400',
    text: 'text-success-800 dark:text-success-200',
  },
  warning: {
    bg: 'bg-warning-50 dark:bg-warning-950 border-warning-200 dark:border-warning-800',
    icon: 'text-warning-600 dark:text-warning-400',
    text: 'text-warning-800 dark:text-warning-200',
  },
  danger: {
    bg: 'bg-danger-50 dark:bg-danger-950 border-danger-200 dark:border-danger-800',
    icon: 'text-danger-600 dark:text-danger-400',
    text: 'text-danger-800 dark:text-danger-200',
  },
};

const icons = {
  info: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>`,
  success: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  warning: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>`,
  danger: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>`,
};

/**
 * Show a toast
 * @param {string|object} message - Message string or options object
 * @param {object} [options]
 */
export function toast(message, options = {}) {
  const opts = typeof message === 'object' ? message : { message, ...options };
  const {
    message: msg = '',
    variant = 'info',
    duration = 4000,
    dismissible = true,
  } = opts;

  const style = variants[variant] || variants.info;
  const id = uid('toast');

  const el = createElement('div', {
    id,
    class: `pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg ${style.bg} animate-slide-up`,
    role: 'status',
  });

  el.innerHTML = `
    <span class="shrink-0 ${style.icon}">${icons[variant] || icons.info}</span>
    <p class="flex-1 text-sm font-medium ${style.text}">${msg}</p>
    ${dismissible ? `<button type="button" class="shrink-0 ${style.icon} hover:opacity-70" data-toast-close aria-label="Dismiss">
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>` : ''}
  `;

  ensureContainer().appendChild(el);

  const remove = () => {
    el.style.transition = 'opacity 0.2s, transform 0.2s';
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => el.remove(), 200);
  };

  if (dismissible) {
    el.querySelector('[data-toast-close]')?.addEventListener('click', remove);
  }

  if (duration > 0) {
    setTimeout(remove, duration);
  }

  return { id, dismiss: remove };
}

export function initToasts() {
  // Nothing to init statically; API is toast()
}
