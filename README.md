# Montu Strain Selector (Next.js + SQLite + React)

A lightweight web application built with Next.js, React, and SQLite that:

- Syncs product data from the Montu store every 30 minutes
- Stores products, variants, and images in a normalized SQLite schema
- Displays data in a sortable, filterable table using AG Grid
- Designed with modular repositories and a clean, maintainable architecture

## Stack

- Next.js (App Router)
- SQLite via better-sqlite3
- React + AG Grid
- Tailwind CSS

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set environment variables in `.env.local`:
   ```
   DATA_URL=https://your-source.com/products.json
   ```

3. Run the development server:
   ```
   npm run dev
   ```

## Notes

- SQLite tables are initialized on app startup via the repository layer.
- Products are fetched from `/api/products`.
- Uses modular separation: models, repositories, sync logic.

---

MIT License
