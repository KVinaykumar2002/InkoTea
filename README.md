# INKOTEA

Marketing website and admin dashboard for the INKOTEA franchise brand.

## Project structure

```
InkoTea/
├── frontend/     # Next.js marketing site + admin dashboard
├── backend/      # Express API (SQLite, JWT auth)
└── package.json  # Root scripts to run both
```

## Quick start

```bash
# Install dependencies
npm run install:all
npm install

# Seed the database (first time)
npm run seed

# Run frontend + backend together
npm run dev
```

- **Marketing site:** http://localhost:3000
- **Admin dashboard:** http://localhost:3000/admin
- **API:** http://localhost:4000/api

### Default admin credentials

- Email: `admin@inkotea.com`
- Password: `admin123`

Change these in `backend/.env` before deploying to production.

## Admin features

- Dashboard overview (leads, content counts)
- Lead management (view, filter, update status, delete)
- CRUD for outlets, menu items, blog posts, FAQs, testimonials

## Environment

Copy `backend/.env.example` → `backend/.env` and `frontend/.env.local.example` → `frontend/.env.local`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend |
| `npm run dev:frontend` | Next.js only |
| `npm run dev:backend` | API only |
| `npm run seed` | Reset & seed database |
| `npm run build` | Build both projects |
