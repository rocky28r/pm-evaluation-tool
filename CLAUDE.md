# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a PM (Product Manager) Skills Assessment tool built with React, TypeScript, Vite, and shadcn/ui. It allows product managers to self-assess their skills across four competency areas (Customer Insight, Product Strategy, Influencing People, Product Execution) and compare against role-based benchmarks.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://[::]:8080)
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm preview
```

## Architecture

### Core State Management

The application's central state is managed by `useSkillsAssessment` hook (src/hooks/useSkillsAssessment.ts), which handles:
- Skills scores (0-3 scale) for 12 skills across 4 categories
- Role selection and role-based expectations
- URL state persistence (base64-encoded query params)
- localStorage persistence
- Data transformation between 12-skill array and 16-element array (with spacers for chart visualization)

### Data Model

Skills are stored in a sparse 16-element array structure defined in `src/lib/pm-skills-data.ts`:
- Indices 0, 4, 8, 12 are null spacers (for chart visualization)
- Indices 1-3: Customer Insight skills
- Indices 5-7: Product Strategy skills
- Indices 9-11: Influencing People skills
- Indices 13-15: Product Execution skills

Role expectations are stored as 12-element arrays and transformed to 16-element format via `transformScores()`.

### Component Structure

- **Index.tsx** - Main page component that orchestrates the UI layout
- **useSkillsAssessment** - Central state management hook
- **RoleSelectorCard** - Role selection dropdown
- **SkillCategoryAccordion** - Collapsible skill input sections
- **SkillsChart** - Radar chart visualization using Chart.js/react-chartjs-2
- **GapAnalysis** - Shows strengths and improvement areas
- **ExportButton** - PDF export using jsPDF (generates 2-page PDF with table and radar chart)
- **SaveLoadKey** - Share/load functionality via base64-encoded state

### Key Technical Patterns

**State Synchronization**: The app maintains three-way state sync:
1. In-memory React state (scores object)
2. URL query parameter (`?state=base64EncodedData`)
3. localStorage (`pmSkillsAssessmentScores`)

**Chart Data Transformation**: Skills are stored in a 16-element array with null spacers to create visual separation in the radar chart between the four competency quadrants.

**PDF Export**: The ExportButton component captures the Chart.js canvas element and embeds it in a multi-page PDF along with tabular gap analysis data.

### Styling

- Uses Tailwind CSS with custom theme configuration in `tailwind.config.ts`
- Custom colors defined for skill categories: yellow (Customer Insight), cyan (Product Strategy), blue (Influencing People), orange (Product Execution)
- shadcn/ui components configured via `components.json`
- Path alias `@` maps to `./src` directory

### Routes

- `/` - Main assessment page (Index.tsx)
- `*` - 404 page (NotFound.tsx)

Add custom routes above the catch-all `*` route in App.tsx.

## Important Notes

- The dev server runs on port 8080 with IPv6 binding (`::`)
- The project uses SWC for faster React compilation
- Skills data and role expectations are hardcoded in `src/lib/pm-skills-data.ts`
- The assessment is fully client-side with no backend API
