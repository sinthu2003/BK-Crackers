# BK Crackers Store - Frontend

A modern, responsive e-commerce application for crackers/fireworks, built with React, TypeScript, and Vite.

## 🚀 Features

- **Storefront:** Dynamic product listing and category filtering.
- **Quick Buy:** Streamlined bulk purchasing interface.
- **Cart & Checkout:** Full shopping cart functionality with delivery details integration.
- **User Authentication:** Secure login and profile management.
- **Favorites:** Personal wishlist for users.
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.

## 🛠 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **API Client:** Axios
- **Routing:** React Router 7

## ☁️ Deployment (Cloudflare Pages)

This project is optimized for deployment on Cloudflare Pages.

### Configuration Steps

1. **Connect GitHub:** Link this repository to your Cloudflare Pages dashboard.
2. **Build Settings:**
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `dist`
3. **Environment Variables:**
   You **must** add the following variables in the Cloudflare dashboard:
   - `VITE_API_URL`: The base URL of the backend API.
   - `VITE_TENANT_KEY`: Your unique tenant identifier.

### Routing Note
The `public/_redirects` file is included to ensure that deep links (e.g., `/cart`, `/profile`) work correctly after a browser refresh.

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗 Project Structure

- `src/components`: Reusable UI components.
- `src/pages`: Page-level components.
- `src/services`: API integration services.
- `src/contexts`: Global state (Auth, Cart, Favorites).
- `src/types`: TypeScript interfaces and types.
