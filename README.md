# Nayantara Ecommerce Website

A full-featured, modern ecommerce landing page built with **Next.js**, **Prisma**, and **TypeScript**. This project is designed to demonstrate best practices for scalable ecommerce solutions, combining a robust backend with a responsive and engaging frontend.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Nayantara Ecommerce Website showcases a modern, responsive ecommerce landing page.  
It is built with scalability, maintainability, and performance in mind.  
Key aspects include server-side rendering, type safety, a relational database, and modular code organization.

---

## Features

- 🛒 **Product Catalog:** Browse products with filtering and sorting.
- 🔍 **Product Search:** Search for products by name or category.
- 🖼️ **Product Details:** View detailed information and images for each product.
- 🧺 **Shopping Cart:** Add, remove, and update items in a persistent cart.
- 👤 **User Authentication:** Secure sign up, login, and account management.
- 💳 **Checkout Flow:** Simulated checkout process with order summary.
- 📦 **Order History:** View past orders (if implemented).
- 📱 **Responsive Design:** Mobile-friendly interface.
- ⚡ **Performance Optimizations:** Fast page loads using SSR and dynamic imports.
- 🛠️ **Admin Panel:** (Optional) Manage products and orders.
- ✨ **Type Safety:** End-to-end type safety using TypeScript.

---

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Backend:** Next.js API Routes, [Prisma ORM](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (default, can be changed)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (if implemented)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (or CSS modules, specify as appropriate)
- **Other:** [Vercel](https://vercel.com/) for deployment

---

## Project Structure

```text
/
├── components/         # Reusable React components
├── pages/              # Next.js pages (routing)
│   ├── api/            # API routes (backend logic)
├── prisma/             # Prisma schema and migration files
├── public/             # Static files (images, icons)
├── styles/             # Global styles
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── .env.example        # Environment variable template
├── next.config.js      # Next.js configuration
├── package.json        # Project metadata and scripts
└── README.md           # Project documentation
```

---

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Prajwal471/Nayantara-Ecommerce-website.git
    cd Nayantara-Ecommerce-website
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up the database**

    - Copy the example env file and configure your database connection string:

    ```bash
    cp .env.example .env
    ```

    - Edit `.env` to include your actual database URL and other secrets.

    - Run Prisma migrations to set up your database schema:

    ```bash
    npx prisma migrate dev
    ```

4. **(Optional) Seed the database**

    ```bash
    npx prisma db seed
    ```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NEXTAUTH_SECRET=your-secret-key
# Add other keys as needed
```

---

## Usage

To start the development server:

```bash
npm run dev
```

Visit the site at [http://localhost:3000](http://localhost:3000).

To build and start in production mode:

```bash
npm run build
npm start
```


## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- All open source contributors and resources used in this project.
