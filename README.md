# Nusa UI

Nusa UI is a reusable, mobile-first component layer built on Tailwind CSS 3. It is intended as a starting design system for Laravel Blade, PHP, and frontend projects.

## Requirements
- Node.js 18+
- npm
- Tailwind CSS 3.4

## Installation
```bash
npm install
npm run build
```
The compiled stylesheet is generated at `dist/nusa-ui.css`.

For development:
```bash
npm run dev
```

Include the compiled stylesheet and optional interaction helpers:
```html
<link rel="stylesheet" href="/dist/nusa-ui.css">
<script src="/src/js/nusa-ui.js" defer></script>
```

## Laravel integration
1. Copy `src/css`, `src/js`, `tailwind.config.js`, and PostCSS configuration into your Laravel project, or install this package as a local dependency.
2. Add Blade paths to `content` in `tailwind.config.js`, for example `./resources/views/**/*.blade.php`.
3. Import `src/css/app.css` into your Vite entry point and run `npm run build` through your Laravel/Vite workflow.
4. Keep the `@tailwind` directives before component imports. Do not load a second prebuilt copy of the stylesheet if Vite already compiles it.

## Naming conventions
- Buttons: `btn`, `btn-primary`, `btn-outline`, `btn-sm`, `btn-lg`
- Layout: `container`, `section`, `content-grid`, `sidebar-layout`
- Navigation: `site-header`, `navbar`, `nav-link`, `site-footer`
- Forms: `form-group`, `form-label`, `form-input`, `form-select`, `form-textarea`
- Feedback: `alert`, `badge`, `progress`
- Data: `card`, `stat-card`, `table-wrap`, `table`, `pagination`
- Sections: `hero`, `feature-grid`, `pricing-grid`, `testimonial`, `cta`

## Dark mode
Dark mode uses Tailwind's `class` strategy. Add `dark` to the root `<html>` element:
```html
<html class="dark">
```
The framework's token-based surfaces and text colors adapt automatically. Some status colors and utility examples are intentionally light-themed and can be extended for a project's visual identity.

## Responsive breakpoints
Tailwind defaults: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.

## Accessibility notes
Use real buttons for actions, links for navigation, labels connected to inputs, and ARIA attributes for custom controls. The included JavaScript is intentionally small; production applications should add focus trapping and focus restoration to modal dialogs and implement full keyboard patterns for complex widgets.

## Customization
Edit the CSS variables in `src/css/foundation.css` to change brand colors, surfaces, text, borders, radius and shadow. Extend Tailwind theme tokens in `tailwind.config.js` for project-specific utilities.

## Current scope
This starter includes foundational typography, layout, navigation, buttons, cards, forms, feedback, tables, badges, pagination, modal styling, tabs, accordion styling, landing-page sections, and a small set of interaction helpers. It is a foundation to evolve—not a replacement for a full accessibility-tested component library.
