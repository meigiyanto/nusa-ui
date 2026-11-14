# Contributing

Thanks for your interest in improving UI Framework.

## Development setup

```bash
npm install
npm run dev          # watch CSS
npx serve public     # examples
npx serve docs       # documentation
```

## Guidelines

1. **Tailwind CSS v3 only** — do not introduce v4 syntax or other CSS frameworks.
2. **Mobile-first** — write base styles for small screens, then enhance with `sm:` / `md:` / `lg:`.
3. **Copy-paste friendly** — components in `src/components/` should work when pasted into a Tailwind project with our tokens.
4. **Accessibility** — use semantic HTML, ARIA where needed, and keep keyboard paths working.
5. **Vanilla JS** — prefer small, focused modules under `src/js/components/`. Avoid unnecessary dependencies.
6. **Tokens first** — prefer CSS variables from `themes.css` over hard-coded colors.

## Pull requests

- Keep changes focused.
- Update `CHANGELOG.md` for user-facing changes.
- If you add a component, include an HTML snippet under `src/components/` and, when possible, a docs page following `docs/components/buttons.html`.

## License

By contributing, you agree that your contributions are licensed under the MIT License.
