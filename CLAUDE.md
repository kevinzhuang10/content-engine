# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build the application with Turbopack
npm run build

# Start production server
npm start

# Run ESLint for code quality checks
npm run lint
```

The development server runs on http://localhost:3000.

## Project Architecture

This is a Next.js 15 application using the App Router pattern with the following key technologies:

- **Framework**: Next.js 15.5.3 with App Router
- **Build Tool**: Turbopack (Next.js's new bundler)
- **Styling**: Tailwind CSS v4 with PostCSS
- **TypeScript**: Strict TypeScript configuration
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **Linting**: ESLint with Next.js TypeScript configuration

### Directory Structure

- `src/app/` - App Router pages and layouts (Next.js 13+ pattern)
- `src/app/layout.tsx` - Root layout with font configuration
- `src/app/page.tsx` - Homepage component
- `src/app/globals.css` - Global Tailwind CSS styles
- `public/` - Static assets (images, icons)
- `ai-dev-tasks/` - Structured AI development workflow files

### Path Aliases

The project uses `@/*` as an alias for `./src/*` (configured in tsconfig.json).

## AI Dev Tasks

Use these files when I request structured feature development using PRDs:

- `/ai-dev-tasks/create-prd.md` - Generate Product Requirement Documents
- `/ai-dev-tasks/generate-tasks.md` - Break PRDs into actionable task lists
- `/ai-dev-tasks/process-task-list.md` - Execute tasks systematically

Use these when implementing complex features that benefit from structured planning and step-by-step execution.

## Configuration Notes

- TypeScript is configured with strict mode and Next.js plugin
- ESLint extends Next.js core web vitals and TypeScript configurations
- Tailwind CSS v4 is configured via PostCSS
- The project uses ES2017 target for broad compatibility