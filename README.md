# Harsh Kumar — Portfolio

A custom portfolio built with Astro, React, TypeScript, Tailwind CSS, and official shadcn/ui components. Static output is ready for GitHub Pages at **https://harshkumar.de**.

## Local development

Use Node.js 24 (or `nvm use`) and npm.

```sh
npm ci
npm run dev
```

Open the local address printed by Astro. To run a foreground server when using an agent:

```sh
npm run dev -- --port 4322 --ignore-lock
```

Checks and production build:

```sh
npm run check
npm run build
npm run preview
```

The generated site is in `dist/`. Build output and dependencies are ignored by Git.
