# UI Framework

A complete, modern, responsive UI Framework built on **Tailwind CSS v3**.

## Features

- Design System with CSS variables (Light / Dark / Custom themes)
- Mobile-first responsive components
- Accessible (WCAG 2.2 AA oriented)
- Copy-paste friendly markup
- Vanilla JavaScript interactions
- Component-first architecture

## Requirements

- Node.js 18+
- npm 9+

## Installation

```bash
npm install
```

## Development

```bash
# Watch & rebuild CSS
npm run dev

# Production CSS build
npm run build
```

## Project Structure

```
ui-framework/
├── src/
│   ├── css/           # Tailwind entry + design tokens + components
│   ├── js/            # Core + component scripts
│   ├── components/    # HTML component snippets (organized by category)
│   └── assets/
├── docs/              # Documentation site
├── examples/          # Live examples & showcases
├── dist/              # Built CSS/JS
├── public/
├── scripts/
├── tests/
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Design Tokens

Colors, radii, shadows, fonts are defined as CSS custom properties in `src/css/themes.css` and wired into Tailwind via `tailwind.config.js`.

Switch theme:

```js
import { setTheme, toggleTheme } from './src/js/core.js';
setTheme('dark');
// or
toggleTheme();
```

## Browser Support

Modern browsers (last 2 versions of Chrome, Firefox, Safari, Edge).

## License

MIT
