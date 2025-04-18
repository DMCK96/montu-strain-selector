# Montu Strain Selector (Next.js + PostgreSQL + React)

A lightweight web application built with Next.js, React, and PostgreSQL that:

- Syncs product data from the Montu store every 30 minutes
- Stores products, variants, and images in a normalized PostgreSQL schema
- Displays data in a sortable, filterable table using AG Grid
- Designed with modular repositories and a clean, maintainable architecture

## Stack

- Next.js (App Router)
- PostgreSQL
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
   DATABASE_URL=postgresql:connection-string-here
   ```

3. Run the development server:
   ```
   next dev
   ```

## Notes

- Database file not supplied, schema available in repository files to create your own.

---

MIT License
