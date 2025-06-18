# Temade E-commerce Platform

A modern e-commerce platform built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS.

## Features

- 🛍️ Complete e-commerce functionality
- 👤 User authentication and profiles
- 🛒 Shopping cart with persistent storage
- ❤️ Wishlist functionality
- 📦 Order management and history
- 💾 MongoDB integration with local storage fallback
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Package Manager**: pnpm
- **UI Components**: Custom components with Lucide icons
- **Animations**: Framer Motion
- **Carousel**: Embla Carousel
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- pnpm 8.0.0 or higher
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd temade-ecommerce
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Add your MongoDB connection string to `.env.local`:
\`\`\`env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/temade_ecommerce?retryWrites=true&w=majority
\`\`\`

5. Run the development server:
\`\`\`bash
pnpm dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Dependencies Explained

### Core Dependencies
- **next**: React framework with App Router
- **react** & **react-dom**: React library
- **typescript**: Type safety
- **mongodb**: Database driver

### UI & Styling
- **tailwindcss**: Utility-first CSS framework
- **tailwind-scrollbar-hide**: Hide scrollbars utility
- **lucide-react**: Icon library
- **framer-motion**: Animation library

### Features
- **embla-carousel-react** & **embla-carousel-autoplay**: Image carousels
- **react-hot-toast**: Toast notifications

### Development
- **eslint** & **eslint-config-next**: Code linting
- **@types/**: TypeScript type definitions

## Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── user/          # User data management
│   │   └── orders/        # Order processing
│   ├── auth/              # Authentication pages
│   ├── components/        # React components
│   ├── context/           # React Context providers
│   ├── data/              # Static data and types
│   └── shop/              # Shop pages
├── lib/                   # Utility libraries
│   ├── models/            # TypeScript interfaces
│   ├── services/          # Database services
│   └── mongodb.ts         # Database connection
└── public/                # Static assets
\`\`\`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## Environment Variables

Required environment variables:
- `MONGODB_URI` - MongoDB connection string

## License

This project is licensed under the MIT License.
