# Assignment 2 — Lumis: Full-Stack E-Commerce Platform

A production-grade full-stack e-commerce application built with **Next.js App Router**, **Prisma ORM**, **Better Auth** for authentication, and **PostgreSQL** as the relational database. Features a product catalog, user authentication, order management, and an admin audit trail.

## 🚀 Features

- **Product Catalog** — Filterable, searchable grid of catalog items with category pills
- **User Authentication** — Email/password sign-up & sign-in via Better Auth
- **Order Placement** — Authenticated order creation with stock validation
- **Customer Dashboard** — Personal order history with live relational queries
- **Admin Console** — Audit trail viewer and user directory with role-based access
- **Email Notifications** — Order confirmation emails via Resend
- **Light Mode UI** — Clean, modern design with Tailwind CSS and indigo accents

## 🛠️ Tech Stack

| Layer           | Technology                        |
|-----------------|-----------------------------------|
| Framework       | Next.js 15 (App Router)           |
| Language        | TypeScript                        |
| Styling         | Tailwind CSS v4                   |
| Database        | PostgreSQL (via Prisma ORM)       |
| Authentication  | Better Auth                       |
| Email           | Resend + React Email              |
| Fonts           | Geist Sans & Geist Mono           |

## 📂 Project Structure

```
├── app/
│   ├── admin/             # Admin operations console
│   ├── api/               # API route handlers
│   ├── auth/
│   │   ├── sign-in/       # Sign-in page
│   │   └── sign-up/       # Sign-up page
│   ├── dashboard/         # Customer order history
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with Navbar & Footer
│   └── page.tsx           # Home page with catalog
├── components/
│   ├── Navbar.tsx         # Sticky navigation bar
│   └── ProductCatalog.tsx # Filterable product grid
├── emails/                # React Email templates
├── lib/
│   ├── auth.ts            # Better Auth server config
│   ├── auth-client.ts     # Better Auth client config
│   ├── db.ts              # Prisma client singleton
│   └── mailer.ts          # Email sending utility
├── prisma/
│   └── schema.prisma      # Database schema
└── middleware.ts          # Route protection middleware
```

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in DATABASE_URL, BETTER_AUTH_SECRET, RESEND_API_KEY, etc.

# Run database migrations and seed
npx prisma migrate dev
npm run db:pipeline   # resets schema + seeds 500+ records

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

The application uses a relational PostgreSQL schema with:
- **User** — Auth accounts with email, name, role (USER/ADMIN)
- **Product** — Catalog items with category, price, stock
- **Order** — Transactional records linking users to products
- **AuditLog** — Immutable event log for all write operations
- **Session / Account / Verification** — Better Auth managed tables

## 📖 How It Works

1. **Browse** the product catalog on the home page — filter by category or search
2. **Sign up / Sign in** to place verified orders
3. Click **Acquire** on any product to place an order (Server Action)
4. View your **Order History** in the Customer Dashboard
5. Admins can access the **Operations Console** to view audit logs and user accounts

## 📝 Assignment Notes

- Demonstrates Next.js App Router with full-stack data flow
- Uses Prisma for type-safe database access and migrations
- Better Auth handles secure JWT-based session management
- Middleware protects authenticated routes before rendering
- AuditLog table provides an immutable record of all system events
