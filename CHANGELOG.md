# Changelog

All notable changes to this project are documented in this file.

## [1.0.0] — 2026-11-14

### Added

#### Design System
- Full color scales (primary, secondary, success, danger, warning, info) via CSS variables
- Surface, border, and text tokens for light and dark themes
- Typography, radius, and shadow tokens
- Custom theme example (`data-theme="ocean"`)

#### Core Components
- Buttons (solid, outline, ghost, soft; sizes xs–xl; loading/disabled)
- Form controls (text, email, password with toggle, select, checkbox, radio, switch, textarea)
- Cards (basic, image, feature, profile, pricing, stats, horizontal)
- Badges / status pills
- Alerts (info, success, warning, danger; dismissible)

#### Advanced Components
- Modal (focus trap, Escape, backdrop)
- Drawer (side panel)
- Tabs (keyboard navigation)
- Accordion
- Dropdown
- Toast notifications
- Tooltips
- Responsive tables

#### Layout & Navigation
- Container / section / stack / grid helpers
- Basic responsive header (desktop nav + mobile drawer)
- Multi-column footer

#### Marketing & Content
- Hero (centered, split)
- Features, CTA, Testimonials, Pricing sections
- Blog card grid
- Login page
- 404 page

#### Documentation
- Docs site with sidebar navigation
- Installation guide
- Theming guide
- Component documentation template (Buttons)
- Live previews and copy-to-clipboard code blocks

#### Tooling
- Tailwind CSS v3 configuration
- PostCSS + Autoprefixer
- Vanilla JS component modules
- Theme persistence (localStorage + system preference)

### Notes
- Framework targets Tailwind CSS **v3** (not v4).
- Components are copy-paste friendly and work with utility classes.
- Interactive behavior is implemented with vanilla JavaScript.
