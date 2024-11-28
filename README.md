# Inspect AI

A monorepo containing the Inspect AI projects, built with Turborepo.

## What's inside?

This monorepo uses [pnpm](https://pnpm.io) as a package manager and includes the following packages/apps:

### Apps

- `extension-chrome`: a Chrome extension built with React and TypeScript
- `extension-firefox`: a Firefox extension built with React and TypeScript

### Packages

- `shared`: shared TypeScript code
- `ui-shared`: shared React components

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```
