# Release Checklist (v1.0.0)

**Status: Ready for local verification & tag**

## Pre-release (completed)

- [x] Version `1.0.0` in `package.json`
- [x] `CHANGELOG.md` written
- [x] `LICENSE` (MIT) present
- [x] `README.md` complete
- [x] `docs/usage.md` usage guide
- [x] `docs/installation.html` + `docs/theming.html`
- [x] `docs/qa-checklist.md`
- [x] `CONTRIBUTING.md`
- [x] `.gitignore`
- [x] Scripts: `dev`, `build`, `docs`, `examples`

## Local verification (run on your machine)

```bash
cd ui-framework
npm install
npm run build                    # → dist/css/framework.css
npm run examples                 # serve public/
npm run docs                     # serve docs/
```

Manual browser checks:

- [ ] No console errors on `public/phase2.html`, `public/phase3.html`, `public/landing.html`
- [ ] Theme toggle works and persists after reload
- [ ] Modal, Drawer, Tabs, Accordion, Dropdown, Toast work
- [ ] Mobile menu at width ≤ 768px
- [ ] No horizontal overflow at 320px
- [ ] Keyboard: Tab through controls; Escape closes overlays

## Tag (when verification passes)

```bash
git add -A
git commit -m "chore: release v1.0.0"
git tag v1.0.0
git push origin main --tags
```

## Optional

- [ ] Publish to npm (only if packaging as a library)
- [ ] Deploy docs site (e.g. static host)
- [ ] Expand component docs beyond Buttons

## Deliverable summary

| Area | Delivered |
|------|-----------|
| Design system | Tokens + light/dark + custom theme hook |
| Components | Buttons, forms, cards, badges, alerts, modal, drawer, tabs, accordion, dropdown, toast, tooltip, tables |
| Sections | Heroes, features, pricing, testimonials, CTA, blog grid |
| Pages | Login, 404, landing example |
| Docs | Intro, install, theming, usage, buttons, QA, release |
| Tooling | Tailwind v3, PostCSS, ES module JS, npm scripts |
