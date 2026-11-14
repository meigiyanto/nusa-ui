# Usage Guide

## Including the framework

### Option A — Built CSS + ES modules (recommended)

```bash
npm install
npm run build
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="/dist/css/framework.css" />
</head>
<body>
  <!-- Your markup using framework components / Tailwind classes -->

  <script type="module" src="/src/js/index.js"></script>
</body>
</html>
```

`src/js/index.js` initializes theme handling and all interactive components (modals, tabs, accordions, etc.).

### Option B — Copy-paste only

1. Ensure Tailwind CSS v3 is set up in your project.
2. Copy the relevant HTML from `src/components/**`.
3. Optionally copy `src/css/themes.css` (or the token values) so colors/surfaces match.
4. For interactive pieces, import only the modules you need:

```js
import { initModals } from './src/js/components/modal.js';
import { initTabs } from './src/js/components/tabs.js';

initModals();
initTabs();
```

## Theme switching

```js
import { initTheme, setTheme, toggleTheme, getTheme } from './src/js/core.js';

initTheme();                 // apply stored or system preference
setTheme('dark');            // force dark
setTheme('light');           // force light
toggleTheme();               // flip
console.log(getTheme());     // 'light' | 'dark'
```

Or use a button that toggles the `dark` class on `<html>` and writes to `localStorage` under the key `ui-framework-theme`.

## Component conventions

| Pattern | Meaning |
|---------|---------|
| `data-modal-open="id"` | Opens the modal with that `id` |
| `data-modal-close` | Closes the nearest modal |
| `data-drawer-open="id"` | Opens drawer |
| `data-drawer-close` | Closes drawer |
| `data-tabs` / `role="tab"` | Tabs container / tab triggers |
| `data-accordion` / `data-accordion-trigger` | Accordion root / triggers |
| `data-dropdown` / `data-dropdown-toggle` / `data-dropdown-menu` | Dropdown |
| `data-password-toggle` + `data-password-input` | Password visibility |
| `data-alert-dismiss` | Dismiss alert |
| `data-tooltip="text"` | Tooltip on hover/focus |
| `toast('Message', { variant: 'success' })` | Show toast (import from toast module) |

## Customizing look

Edit CSS variables in `src/css/themes.css` (or override them in your own stylesheet):

```css
:root {
  --color-primary-600: #0284c7;
  --radius-default: 0.5rem;
  --font-sans: "Your Font", system-ui, sans-serif;
}
```

Components keep using the same utility class names (`bg-primary-600`, `rounded-lg`, …); only the token values change.

## Accessibility tips

- Prefer native `<button>` for actions.
- Give icon-only controls an `aria-label`.
- Keep labels associated with form controls (`for` / `id`).
- Do not remove focus styles; they are required for keyboard users.

## Where to look next

| Need | Location |
|------|----------|
| Install steps | `docs/installation.html` |
| Tokens & dark mode | `docs/theming.html` |
| Button variants | `docs/components/buttons.html` + `src/components/buttons/` |
| Interactive demos | `public/phase2.html`, `public/phase3.html` |
| Full page example | `public/landing.html` |
| QA / release | `docs/qa-checklist.md`, `docs/release-checklist.md` |
