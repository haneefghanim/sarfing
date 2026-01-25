# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sarfing is a Next.js application for practicing Arabic verb morphology (sarf). It helps users practice conjugating Arabic verbs by generating random roots and patterns, then timing how quickly users can recite the full conjugation tables.

## Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm start` - Start production server

## Architecture

### Two Practice Modes

1. **Regular Sarfing** (`RegularSarfTester.tsx`): Generates a 3-letter Arabic root and a pattern (1-10). User recites the sarf sagheer table. Pattern 1 has 6 sub-patterns called "babs" (ن, ف, ض, س, ح, ك).

2. **Irregular Sarfing** (`IrregularSarfTester.tsx`): Presents pre-defined irregular verbs filtered by irregularity type (مهموز, مثال, أجوف, مضاعف, ناقص, لفيف) and verb tense (past/present).

### Core Data Files (`lib/`)

- `sarf-patterns.ts` - Defines the 10 verb patterns with their conjugation tables. Pattern 1 uses an object keyed by bab, patterns 2-10 use arrays.
- `generate-sarf-sagheer-table-from-root.ts` - Programmatically generates sarf sagheer conjugation tables for patterns 2-10 from any root. Handles various irregularities (naaqis, ajwaf, mithaal, mudhaaf, etc.).
- `roots.ts` - List of 3-letter Arabic roots used for random generation
- `past-tense-irregular-verbs.ts` / `present-tense-irregular-verbs.ts` - Large collections of pre-conjugated irregular verbs
- `irregularities.ts` - Types for Arabic verb irregularity categories
- `verb.ts` - Verb interface definition

### UI Components (`components/ui/`)

Uses shadcn/ui component patterns with Radix UI primitives. Key components: Button, Card, Tabs, Drawer, MultiSelect, Table.

### Path Aliases

Uses `@/*` to reference project root (configured in `tsconfig.json`).
