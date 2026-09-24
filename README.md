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

## What's included

- Responsive homepage: selected work, experience, engineering skills, about, education, and contact.
- Interactive React workbench with an architecture explorer, illustrative Java source, and a replayable request simulation.
- Three individually styled project pages under `/work/`, with workflow diagrams, contributions, and outcomes.
- shadcn/ui Button, Badge, Sheet, and Tabs components; Sheet provides the mobile navigation.
- Locally bundled Fraunces, Inter, and JetBrains Mono fonts, matched to the supplied CV.
- Downloadable original CV, working professional links, and email contact.
- Page titles/descriptions, canonical URLs, Person structured data, sitemap, robots.txt, and a custom 404 page.
- Neutral dark glass materials, with a bundled silver-flow SVG backdrop, translucent navigation, and a smoked-glass workbench.
- Subtle pointer reflections with single clean edges on the header and hero project panel; no foreground content is distorted.
- Reduced-motion, reduced-transparency, increased-contrast, and keyboard skip-link support.

## Content and styling

| File | Purpose |
| --- | --- |
| `src/data/profile.ts` | Name, email, domain, and social links |
| `src/data/projects.ts` | Project-page facts, contributions, outcomes, and workflow summaries |
| `src/pages/index.astro` | Homepage copy and section composition |
| `src/components/SystemExplorer.tsx` | Interactive backend workbench |
| `src/components/LiquidGlass.astro` | Accessible pointer reflections |
| `src/components/ui/` | Official shadcn/ui source components |
| `src/styles/global.css` | Dark glass materials and shared color tokens, CV font families, and shared primitives |
| `src/styles/portfolio.css` | Homepage design, navigation, and footer |
| `src/styles/liquid-glass.css` | Glass rims, reflections, and accessibility fallbacks |
| `src/styles/workbench.css` | Interactive workbench styles |
| `src/styles/case-study.css` | Project page design and responsive layouts |
| `public/Harsh-Kumar-CV.pdf` | Downloadable CV |
| `astro.config.mjs` | Static site configuration and canonical deployment domain |

The homepage is editorially composed; update relevant homepage copy when changing project data. Metrics come from the supplied CV. Current Leitnetz work is described as ongoing. Diagrams are illustrative and do not reproduce private employer architecture or product screenshots. The downloadable CV includes the contact information in the original supplied PDF.

## Publish to GitHub Pages

Target repository: https://github.com/HarshKumarJS/HarshKumarJS.github.io

1. Put this project's source files into that repository, preserving any existing repository work. Include `package-lock.json` and `.github/workflows/deploy.yml`; do not upload `node_modules/` or `dist/`.
2. The workflow uses `main` for automatic deployment. If the repository uses a different production branch, update `on.push.branches` first. The deploy job is restricted to the repository's default branch, including manually triggered runs.
3. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
4. After the source is committed to the default branch, the workflow installs dependencies, runs Astro checks, builds, and deploys. You can also run it from **Actions → Deploy portfolio to GitHub Pages → Run workflow** once the workflow exists on the default branch.
5. Set the `github-pages` environment's deployment branch policy to the production/default branch.

This project is configured for the root of the domain (`/`), as appropriate for both the supplied `HarshKumarJS.github.io` repository and the custom domain. It does not need a repository-name base path.

## Connect harshkumar.de

Follow [GitHub's custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

1. Verify domain ownership in your GitHub account settings using GitHub's supplied TXT record.
2. Set **harshkumar.de** as the custom domain in the repository's **Settings → Pages**, before pointing DNS at GitHub.
3. At your authoritative DNS provider (GoDaddy if it manages your nameservers), configure these records:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | HarshKumarJS.github.io |

Replace only conflicting website records; preserve unrelated email and verification records. DNS changes may take up to 24 hours. Once GitHub validates the domain and provisions its certificate, enable **Enforce HTTPS**. With both domain variants configured, GitHub redirects `www.harshkumar.de` to the chosen `harshkumar.de` domain.

The domain is configured in GitHub Pages settings. A repository `CNAME` file is not required for this custom GitHub Actions workflow.

## Contact behavior

Contact uses email and professional-profile links. There is no form backend, tracking service, or runtime database to configure. GitHub Pages serves the generated HTML, CSS, JavaScript, and static assets.
