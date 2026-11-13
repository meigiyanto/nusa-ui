/**
 * UI Framework — Core Utilities
 * Lightweight helpers used across components.
 */

export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export function on(element, event, handler, options) {
  if (!element) return;
  element.addEventListener(event, handler, options);
  return () => element.removeEventListener(event, handler, options);
}

export function delegate(root, selector, event, handler) {
  return on(root, event, (e) => {
    const target = e.target.closest(selector);
    if (target && root.contains(target)) {
      handler.call(target, e, target);
    }
  });
}

export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'class' || key === 'className') {
      el.className = value;
    } else if (key === 'dataset') {
      Object.assign(el.dataset, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === 'text') {
      el.textContent = value;
    } else if (key === 'html') {
      el.innerHTML = value;
    } else {
      el.setAttribute(key, value);
    }
  });
  children.forEach((child) => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  });
  return el;
}

/**
 * Theme management
 */
export function getTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('ui-framework-theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('ui-framework-theme', 'light');
  }
  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

export function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

export function initTheme() {
  const stored = localStorage.getItem('ui-framework-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  setTheme(theme);
}

/**
 * Simple event bus for loose coupling
 */
const listeners = new Map();

export const bus = {
  on(event, fn) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(fn);
    return () => listeners.get(event)?.delete(fn);
  },
  emit(event, payload) {
    listeners.get(event)?.forEach((fn) => fn(payload));
  },
  off(event, fn) {
    listeners.get(event)?.delete(fn);
  },
};

/**
 * Focus trap utility (for modals, drawers)
 */
export function trapFocus(container) {
  const focusable = qsa(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    container
  ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

  if (focusable.length === 0) return () => {};

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function handleKey(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  container.addEventListener('keydown', handleKey);
  first.focus();

  return () => container.removeEventListener('keydown', handleKey);
}

/**
 * Generate unique ID
 */
let idCounter = 0;
export function uid(prefix = 'ui') {
  idCounter += 1;
  return `${prefix}-${idCounter}-${Date.now().toString(36)}`;
}
