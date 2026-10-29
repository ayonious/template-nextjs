# Basic Next.js site

[![CI](https://github.com/ayonious/nextjs-template/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/ayonious/nextjs-template/actions/workflows/ci.yml)
[![Coverage Tests](https://github.com/ayonious/nextjs-template/actions/workflows/codecov.yml/badge.svg?branch=master)](https://github.com/ayonious/nextjs-template/actions/workflows/codecov.yml)
[![Cypress Tests](https://github.com/ayonious/nextjs-template/actions/workflows/cypress.yml/badge.svg?branch=master)](https://github.com/ayonious/nextjs-template/actions/workflows/cypress.yml)
[![codecov](https://codecov.io/gh/ayonious/nextjs-template/branch/master/graph/badge.svg?token=sBDqPNO0kH)](https://codecov.io/gh/ayonious/nextjs-template)

A barebones Next.js App Router project with React, TypeScript, and simple CSS.

## Run locally

```sh
yarn install
yarn dev
```

Open http://localhost:3000.

## Test

```sh
yarn test
```

Use `yarn test:watch` while developing to rerun affected tests after changes.
Run `yarn test:coverage` to generate a local coverage report.
Run `yarn cypress:open` while the development server is running to use the Cypress test runner.

## Pages

- `/` — Home (`app/page.tsx`)
- `/about` — About (`app/about/page.tsx`)
- `/contact` — Contact (`app/contact/page.tsx`)

Shared navigation lives in `app/layout.tsx` and styles in `app/globals.css`.
Replace the example email address in the Contact page with your own.

## Production

```sh
yarn build
yarn start
```

## Contact API

`POST /api/contact` accepts a JSON object with `name` (1–100 characters),
`email` (a valid email address, up to 254 characters), and `message`
(1–5000 characters). Name and message are trimmed before validation.

Validation uses Zod in `lib/validation/contact.ts`; the schema and inferred
`ContactInput` type can also be imported by a future frontend form.

- `200`: input validated. This example does **not** send or store messages.
- `400`: malformed JSON or invalid fields. Validation responses include
  `fieldErrors` and `formErrors`.
- Unsupported methods return `405` through Next.js.

Connect an email provider or database in `app/api/contact/route.ts` to process
validated submissions. The Contact page remains unchanged.

```sh
curl -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ada","email":"ada@example.com","message":"Hello!"}'
```
