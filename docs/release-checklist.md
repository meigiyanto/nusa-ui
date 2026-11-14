# Release Checklist (v1.0.0)

## Pre-release

- [x] Version set to 1.0.0 in `package.json`
- [x] CHANGELOG.md updated
- [x] LICENSE present (MIT)
- [x] README complete (install, structure, theming, links)
- [x] QA checklist completed (`docs/qa-checklist.md`)
- [x] `.gitignore` added

## Local verification (run on your machine)

```bash
npm install
npm run build          # should produce dist/css/framework.css
npx serve public       # open phase2, phase3, landing
npx serve docs         # open introduction, installation, buttons
```

Manual checks:

- [ ] No console errors on showcase pages
- [ ] Theme toggle works and persists
- [ ] Modal / Drawer / Tabs / Accordion / Dropdown / Toast work
- [ ] Mobile menu works at ≤768px
- [ ] No horizontal scroll at 320px width
- [ ] Keyboard: Tab through controls, Escape closes overlays

## Optional next improvements

- [ ] More component docs pages (forms, cards, modal, …)
- [ ] Docs full-text search index
- [ ] E2E tests (Playwright/Cypress)
- [ ] Full e-commerce & dashboard section packs
- [ ] Published npm package (if desired)

## Tag & publish (when ready)

```bash
git tag v1.0.0
git push origin v1.0.0
# npm publish  # only if packaging for npm
```
