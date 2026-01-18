This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## 📝 Project History & Changelog

### Phase 1: Initialization & Scaffolding
- **Step 1: Project Scaffolding**
  - Created the comprehensive file structure under `src/`.
  - Established directories for `app`, `auth`, `db`, `models`, `services`, `validators`, `lib`, `config`, and `observability`.
  - Generated all necessary placeholder files for API routes (auth, patient, provider), frontend pages (login, register, dashboards), and utility functions.

- **Step 2: Environment Configuration**
  - Verified and configured the `.env.local` file.
  - Confirmed the MongoDB connection string `mongodb://127.0.0.1:27017/healthcare-app`.

- **Step 3: Repository Setup & Fixes**
  - Initialized the Git repository.
  - Resolved "nested git repository" issues caused by the initial `create-next-app` scaffolding in `healthcare-app`.
  - Removed the internal `.git` directory to ensure a single, clean repository structure.

- **Step 4: Root Restructuring**
  - Moved all application files from the `healthcare-app` subdirectory to the project root (`Healthcare-Portal-main`).
  - This ensures a standard Next.js project structure where `package.json` and `src/` are at the top level.
  - Pushed the finalized structure to GitHub.
