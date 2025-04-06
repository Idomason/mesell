# Mesell - Nigerian Pre-Order Ecommerce Platform

A secure and trusted pre-order ecommerce platform built for the Nigerian market, featuring escrow payments, seller verification, and localized experiences.

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + RTK Query
- **Backend**: Node.js/Express.js + MongoDB + TypeScript
- **Payments**: Paystack Escrow API Integration
- **Font**: Karla (Google Fonts)

## Core Features

- 🔒 Escrow System with Paystack Integration
- ✅ Trust Framework with Seller Verification
- 🌍 Localized Experience (USSD/POS, Multiple Languages)
- 📦 Logistics Integration (MAX.NG/GIG)
- 🎥 Live Streaming for Product Demos

## Project Structure

```
mesell/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages
│   ├── components/          # Reusable components
│   ├── lib/                 # Utility functions
│   └── store/              # RTK Query store
├── backend/                 # Express.js backend application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── tests/              # Backend tests
└── shared/                 # Shared types and utilities
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mesell.git
cd mesell
```

2. Install dependencies:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:

```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key

# Backend (.env)
MONGODB_URI=your_mongodb_uri
PAYSTACK_SECRET_KEY=your_paystack_secret_key
JWT_SECRET=your_jwt_secret
```

4. Start the development servers:

```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm run dev
```

## Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
