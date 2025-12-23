# Home Barista Helper

[![CI](https://github.com/Automaat/home-barista-helper/actions/workflows/ci.yml/badge.svg)](https://github.com/Automaat/home-barista-helper/actions/workflows/ci.yml)

Mobile-first coffee dialing guide for home baristas. Interactive wizard to dial in espresso, pour-over, and more.

## Features

- **Interactive Wizard**: Step-by-step guide to dial in your coffee
- **Grinder Database**: Settings for popular manual and electric grinders
- **Brew Methods**: Espresso, V60, Chemex, Aeropress
- **Troubleshooting**: Decision tree to fix common issues
- **Mobile-First**: Optimized for phone use at your coffee station
- **Multilingual**: English and Polish support

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with adapter-static
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Animations**: [Svelte Motion](https://svelte-motion.gradientdescent.de/)
- **i18n**: [@inlang/paraglide-sveltekit](https://inlang.com/m/dxnzrydw/paraglide-sveltekit-i18n)
- **Testing**: [Vitest](https://vitest.dev/)
- **Linting**: [oxlint](https://oxc.rs/)
- **Tooling**: [mise](https://mise.jdx.dev/)

## Getting Started

### Prerequisites

- [mise](https://mise.jdx.dev/) - dev tools manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Automaat/home-barista-helper.git
cd home-barista-helper

# Install tools (Node.js 22 + pnpm)
mise install

# Install dependencies
pnpm install
```

### Development

```bash
# Start dev server
mise run dev
# or
pnpm dev

# Run linter
mise run lint

# Run type check
mise run check

# Run tests
mise run test

# Build for production
mise run build
```

### Available Commands

All commands are defined in `.mise.toml` and `package.json`:

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `mise run dev`     | Start development server       |
| `mise run build`   | Build for production           |
| `mise run preview` | Preview production build       |
| `mise run lint`    | Run linter (oxlint + prettier) |
| `mise run format`  | Format code with prettier      |
| `mise run check`   | Type check with svelte-check   |
| `mise run test`    | Run tests                      |
| `pnpm test:watch`  | Run tests in watch mode        |
| `pnpm test:ui`     | Open Vitest UI                 |

## Project Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml           # CI/CD pipeline
├── src/
│   ├── lib/                 # Shared components and utilities
│   ├── routes/              # SvelteKit routes
│   │   ├── +layout.svelte   # Root layout
│   │   ├── +layout.ts       # Layout config (prerender)
│   │   └── +page.svelte     # Home page
│   ├── app.css              # Tailwind styles
│   └── app.html             # HTML template
├── .mise.toml               # Tool versions and tasks
├── renovate.json            # Dependency updates config
├── svelte.config.js         # SvelteKit configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vitest.config.ts         # Vitest configuration
```

## CI/CD

GitHub Actions workflow runs on every push and PR:

1. **Lint & Type Check**: oxlint + prettier + svelte-check
2. **Test**: Vitest unit tests
3. **Build**: Production build with adapter-static

All jobs use mise for consistent tooling across environments.

## Deployment

Built for static hosting with `@sveltejs/adapter-static`. Deploy to:

- Cloudflare Pages
- Vercel
- Netlify
- GitHub Pages
- Any static file server

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -s -S -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test changes
- `ci:` - CI/CD changes
- `deps:` - Dependency updates

All commits must be signed (`-s -S`).

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Coffee knowledge from [bulletproof-dialing-framework.md](bulletproof-dialing-framework.md)
- Built with [SvelteKit](https://kit.svelte.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
