This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Initial Build Steps

Follow the [Drizzle with Turso tutorial](https://orm.drizzle.team/learn/tutorials/drizzle-with-turso)

```bash
npm i next-auth@beta drizzle-orm @auth/drizzle-adapter bcrypt
npm install drizzle-kit  @types/bcrypt --save-dev

curl -sSfL https://get.tur.so/install.sh | bash
turso auth login --headless
# copy/paste code from turso auth page

npm i @libsql/client

turso db create udc-web

turso db show udc-web
# copy/paste URL to .env under TURSO_CONNECTION_URL=

turso db tokens create udc-web
# copy/paste token to .env under TURSO_AUTH_TOKEN=

turso db shell udc-web # Optionally shell into db

# Generate auth secret
npx auth secret
```

Create a GitHub App and add the following to `.env.local`
See the [Auth.js GitHub tutorial](https://authjs.dev/guides/configuring-github)

```
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```
