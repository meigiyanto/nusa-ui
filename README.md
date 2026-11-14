# UI Framework

**v1.0.0** · Complete responsive UI framework on **Tailwind CSS v3**

Copy-paste components · Accessible interactions · Light / dark themes · Vanilla JS

---

## Quick start

```bash
npm install
npm run build          # → dist/css/framework.css
npm run examples       # serve public/ (hub + showcases)
npm run docs           # serve documentation
```

Open **`public/index.html`** for the hub linking all showcases and docs.

## Architecture

```
ui-framework/
├── src/
│   ├── css/                 # Design system + Tailwind entry
│   │   ├── themes.css       # Tokens (colors, radii, shadows, fonts)
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── utilities.css
│   │   └── tailwind.css
│   ├── js/
│   │   ├── core.js          # Theme, DOM, focus trap
│   │   ├── index.js         # Boot all interactions
│   │   └── components/      # modal, drawer, tabs, …
│   └── components/          # HTML snippets (copy-paste)
│       ├── INDEX.md         # Full catalog
│       ├── buttons/ forms/ cards/ …
│       ├── ecommerce/ dashboard/
│       └── marketing/ blog/ heroes/
├── public/                  # Live demos
│   ├── index.html           # Hub
│   ├── phase2.html          # Core
│   ├── phase3.html          # Advanced
│   ├── phase4.html          # Sections
│   └── landing.html
├── docs/                    # Documentation site
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## What’s included

| Area | Contents |
|------|----------|
| **Design system** | Colors 50–950, surfaces, radii, shadows, fonts; light + dark + custom theme |
| **Core** | Buttons, forms, cards, badges, alerts |
| **Advanced** | Modal, drawer, tabs, accordion, dropdown, toast, tooltip, tables |
| **Sections** | Heroes, features, pricing, testimonials, CTA, FAQ, team, logo cloud, blog |
| **E-commerce** | Product card, product grid, cart summary |
| **Dashboard** | Sidebar layout, stats, activity |
| **Auth & errors** | Login, register, forgot password, 404, 500 |
| **Docs** | Install, theming, usage, buttons, QA |

## Usage

**Built CSS + modules**

```html
<link rel="stylesheet" href="/dist/css/framework.css" />
<script type="module" src="/src/js/index.js"></script>
```

**Copy-paste** — HTML from `src/components/**` (see `src/components/INDEX.md`).

**Theme API**

```js
import { initTheme, setTheme, toggleTheme } from './src/js/core.js';
initTheme();
toggleTheme();
```

## Showcases

| Page | Description |
|------|-------------|
| `public/index.html` | Hub |
| `public/phase2.html` | Buttons, forms, cards, alerts |
| `public/phase3.html` | Modal, tabs, accordion, toast |
| `public/phase4.html` | Shop, dashboard, auth, marketing |
| `public/landing.html` | Full landing page |

## Documentation

| Page | Path |
|------|------|
| Introduction | `docs/index.html` |
| Installation | `docs/installation.html` |
| Theming | `docs/theming.html` |
| Usage | `docs/usage.md` |
| Buttons | `docs/components/buttons.html` |
| Component index | `src/components/INDEX.md` |
| QA checklist | `docs/qa-checklist.md` |

## Requirements

- Node.js 18+
- Tailwind CSS **v3.x** (not v4)

## License

MIT — see [LICENSE](./LICENSE).

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
