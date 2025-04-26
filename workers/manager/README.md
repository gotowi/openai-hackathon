# Manager

A manager for the agents.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Cloudflare account
- Wrangler CLI
- Neon.tech account and database

## Installation

1. Install Wrangler CLI globally:
```bash
npm install -g wrangler
```

2. Install project dependencies:
```bash
npm install
```

## Development

To start the development server:
```bash
npm run dev
```

This will start a local development server with hot-reloading enabled.

## Deployment

To deploy to Cloudflare Workers:
```bash
npm run deploy
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run deploy` - Deploy to Cloudflare Workers
- `npm run cf-typegen` - Generate Cloudflare Workers types

## Project Structure

- `src/` - Source code directory
- `wrangler.jsonc` - Wrangler configuration
- `.dev.vars` - Development environment variables

## Environment Variables

Create a `.dev.vars` file in the root directory for local development. This file should contain your environment variables in the format:

```
DATABASE_URL=postgres://user:password@ep-xxxx-xxxx.us-east-2.aws.neon.tech/neondb
```

The `DATABASE_URL` is required and should point to your Neon.tech database. You can get this URL from your Neon.tech dashboard after creating a database.

## License

MIT
