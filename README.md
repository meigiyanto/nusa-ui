# Nusa UI

A reusable, responsive and customizable UI component framework built with Tailwind CSS 3.

Nusa UI provides semantic component classes for building modern websites, dashboards, e-commerce applications and SaaS products.

## Features

- Mobile-first responsive design
- Reusable semantic CSS classes
- Tailwind CSS 3.4
- Customizable design tokens
- Light and dark theme foundation
- Responsive navigation and layouts
- Form components
- Dashboard components
- Website sections
- Interactive documentation
- Component preview and source code examples
- Copy code functionality

## Requirements

- Node.js 18+
- npm
- Tailwind CSS 3.4

## Installation

Clone the repository:

```bash
git clone https://github.com/meigiyanto/nusa-ui.git
cd nusa-ui
```

Install dependencies:

```bash
npm install
```

## Development

Start Tailwind CSS development mode:

```bash
npm run dev
```

Build production CSS:

```bash
npm run build
```

The compiled stylesheet is generated at:

```text
dist/nusa-ui.css
```

## Documentation

Nusa UI includes interactive component documentation.

Open:

```text
docs/index.html
```

The documentation includes:

- Component navigation
- Component search
- Live component previews
- HTML source examples
- Copy code functionality
- Responsive documentation layout

For local development, serve the project directory using a local web server.

## Basic Usage

Include the compiled stylesheet:

```html
<link rel="stylesheet" href="/dist/nusa-ui.css">
```

Include JavaScript helpers when needed:

```html
<script src="/src/js/nusa-ui.js" defer></script>
```

Example:

```html
<button class="btn btn-primary">
  Get Started
</button>

<div class="card">
  <div class="card-header">
    <h3 class="heading-5">Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content.</p>
  </div>
</div>
```

## Laravel Integration

1. Install or copy the Nusa UI source files into your Laravel project.
2. Configure Tailwind content paths to include Blade templates.
3. Import the Nusa UI stylesheet into your Vite entry point.
4. Compile the assets using Laravel Vite.
5. Use Nusa UI semantic classes in Blade templates.

Example content path:

```js
content: [
  "./resources/**/*.blade.php",
  "./resources/**/*.js"
]
```

## Responsive Breakpoints

| Breakpoint | Minimum width |
|---|---:|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

## Component Categories

### Foundation
- Typography
- Layout
- Containers
- Grid
- Surfaces

### Components
- Buttons
- Cards
- Badges
- Alerts
- Avatars
- Progress
- Tables
- Pagination
- Breadcrumbs
- Skeleton
- Empty states

### Forms
- Inputs
- Selects
- Textareas
- Checkboxes
- Radio buttons
- Switch styling
- File inputs
- Input groups

### Navigation
- Header
- Navbar
- Sidebar
- Footer
- Dropdown styling

### Website Sections
- Hero
- Features
- Pricing
- Testimonials
- Call to action

### Advanced
- Modal styling
- Tabs styling
- Accordion styling
- Authentication layouts

## Roadmap

- [x] v1.0 - Initial component foundation
- [ ] v1.1 - Interactive documentation
- [ ] v1.2 - Complete dark mode and theme customization
- [ ] v1.3 - Advanced interactive components
- [ ] v1.4 - Dashboard, e-commerce and SaaS components
- [ ] v2.0 - Official documentation website and portfolio showcase

## License

MIT License
