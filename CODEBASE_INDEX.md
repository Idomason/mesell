# Mesell Codebase Index & Catalog

## Project Overview
**Mesell** is a Nigerian pre-order ecommerce platform featuring escrow payments, seller verification, and localized experiences.

### Tech Stack
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + RTK Query
- **Backend**: Node.js/Express.js + MongoDB + TypeScript  
- **Payments**: Paystack Escrow API Integration
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system

---

## 1. Directory Structure

```
mesell/
├── README.md                    # Main project documentation
├── package.json                 # Root package.json (backend config)
├── package-lock.json           # Root lockfile
├── backend/                     # Express.js backend application
│   ├── src/                    # Backend source code
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Express middleware
│   │   ├── models/             # MongoDB models
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic services
│   │   └── server.ts           # Main server entry point
│   └── tsconfig.json           # Backend TypeScript config
└── frontend/                    # Next.js frontend application
    ├── src/                    # Frontend source code
    │   ├── app/                # Next.js App Router pages
    │   ├── components/         # React components
    │   ├── data/               # Static data files
    │   ├── lib/                # Utility functions
    │   ├── services/           # API services
    │   ├── test/               # Test files
    │   ├── Types/              # TypeScript type definitions
    │   └── Rough/              # Development/testing files
    ├── public/                 # Static assets
    ├── components.json         # Shadcn/ui configuration
    ├── next.config.js          # Next.js configuration
    ├── tailwind.config.js      # Tailwind CSS configuration
    ├── jest.config.ts          # Jest testing configuration
    ├── package.json            # Frontend dependencies
    └── tsconfig.json           # Frontend TypeScript config
```

---

## 2. Backend Architecture

### Entry Point
- **File**: `backend/src/server.ts`
- **Port**: 8000 (default) or `process.env.PORT`
- **Features**: CORS enabled, JSON parsing, error handling

### Database Models (`backend/src/models/`)

#### User Model (`User.ts`)
- **Interface**: `IUser`
- **Fields**: email, password, firstName, lastName, phoneNumber, role, isVerified, bvn, businessInfo, rating
- **Roles**: buyer, seller, admin
- **Features**: Password hashing with bcrypt, password comparison method
- **Indexes**: Email (unique)

#### Product Model (`Product.ts`)
- **Interface**: `IProduct`
- **Fields**: seller, name, description, price, preOrderPrice, category, images, specifications, delivery info
- **Categories**: electronics, fashion, home, beauty, food, other
- **Features**: Reviews system, live streaming support, rating system
- **Indexes**: Text search (name, description), category, seller

#### Order Model (`Order.ts`)
- **Interface**: `IOrder`
- **Fields**: buyer, seller, product, quantity, totalAmount, payment/delivery status, escrow info
- **Payment Status**: pending, paid, refunded, released
- **Delivery Status**: pending, processing, shipped, delivered, cancelled
- **Features**: Delivery confirmation, dispute system, tracking
- **Indexes**: buyer, seller, paymentStatus, deliveryStatus

#### Payment Model (`Payment.ts`)
- **Interface**: `IPayment`
- **Fields**: order, amount, currency, paymentMethod, paymentReference, escrowId, status
- **Payment Methods**: card, ussd, pos
- **Status**: pending, success, failed, refunded, released
- **Features**: Webhook data storage, refund tracking
- **Indexes**: order, status, paymentReference (unique), escrowId (unique)

### API Routes (`backend/src/routes/`)

#### Authentication Routes (`auth.ts`)
- `POST /api/auth/register` - User registration

#### Product Routes (`products.ts`)
- `GET /api/products` - List all products

#### Order Routes (`orders.ts`)
- `POST /api/orders` - Create new order

#### Payment Routes (`payments.ts`)
- `POST /api/payments/initialize/:orderId` - Initialize payment (protected)
- `GET /api/payments/verify/:reference` - Verify payment
- `POST /api/payments/release/:orderId` - Release payment (protected)
- `POST /api/payments/refund/:orderId` - Refund payment (protected)

### Services (`backend/src/services/`)

#### Paystack Service (`paystackService.ts`)
- **Class**: `PaystackService`
- **Methods**: 
  - `initializeEscrowPayment()` - Initialize escrow transaction
  - `verifyPayment()` - Verify payment status
  - `createEscrowTransaction()` - Create escrow
  - `releaseEscrowPayment()` - Release funds to seller

### Middleware (`backend/src/middleware/`)
- **auth.ts**: JWT authentication, role-based access control
- **errorHandler.ts**: Global error handling
- **notFoundHandler.ts**: 404 error handling

### Configuration (`backend/src/config/`)
- **db.ts**: MongoDB connection setup

---

## 3. Frontend Architecture

### App Router Structure (`frontend/src/app/`)
```
app/
├── layout.tsx              # Root layout component
├── page.tsx                # Home page
├── globals.css             # Global styles
├── (auth)/                 # Auth route group
│   ├── login/              # Login page
│   └── signup/             # Signup page
└── brand/                  # Brand pages
    └── page.tsx            # Brand listing page
```

### Components (`frontend/src/components/`)

#### Page Components
- **Hero.tsx**: Landing page hero section
- **Brands.tsx**: Brand showcase component
- **PopularProducts.tsx**: Product grid display
- **Quote.tsx**: Testimonial/quote section
- **BrandProfile.tsx**: Individual brand profile
- **LoginForm.tsx**: User login form
- **SignupForm.tsx**: User registration form

#### Common Components (`common/`)
- **Header.tsx**: Site navigation header
- **Footer.tsx**: Site footer

#### UI Components (`ui/`)
- **button.tsx**: Reusable button component with variants
- **card.tsx**: Card container components
- **input.tsx**: Form input component
- **label.tsx**: Form label component

### Data Layer (`frontend/src/data/`)
- **products.ts**: Mock product data (9 products with Unsplash images)
- **brands.ts**: Brand data (6 brands)
- **customer.ts**: Customer testimonial data

### Services (`frontend/src/services/`)
- **paystack.ts**: Paystack payment integration service

### Types (`frontend/src/Types/`)
- **Products.ts**: Product type definitions

### Utilities (`frontend/src/lib/`)
- **utils.ts**: Utility functions (likely includes cn() for className merging)

---

## 4. Dependencies & External Integrations

### Backend Dependencies
**Core Framework:**
- express: Web framework
- mongoose: MongoDB ODM
- cors: Cross-origin resource sharing
- dotenv: Environment variable management

**Authentication & Security:**
- jsonwebtoken: JWT token handling
- bcryptjs: Password hashing

**Validation & HTTP:**
- zod: Schema validation
- axios: HTTP client for external APIs

**Development:**
- typescript: Type safety
- ts-node-dev: Development server
- jest: Testing framework

### Frontend Dependencies
**Core Framework:**
- next: React framework with App Router
- react & react-dom: React library
- typescript: Type safety

**State Management:**
- @reduxjs/toolkit: State management
- react-redux: React-Redux bindings

**UI & Styling:**
- tailwindcss: Utility-first CSS framework
- @radix-ui/*: Headless UI primitives
- @headlessui/react: Accessible UI components
- @heroicons/react: Icon library
- lucide-react: Icon library
- class-variance-authority: Component variant management
- clsx & tailwind-merge: Conditional className utilities

**HTTP & Validation:**
- axios: HTTP client
- zod: Schema validation

**Testing:**
- jest: Testing framework
- @testing-library/*: React testing utilities

### External Services
- **Paystack**: Payment processing and escrow services
- **MongoDB**: Database storage
- **Unsplash**: Image hosting (for demo products)
- **MAX.NG/GIG**: Logistics integration (planned)
- **Agora.io**: Live streaming (configured but not implemented)

---

## 5. Key Features & Functionality

### Core Business Features
1. **Pre-order System**: Products with pre-order pricing and minimum order requirements
2. **Escrow Payments**: Secure payment holding until delivery confirmation
3. **Seller Verification**: Trust framework with BVN and document verification
4. **Multi-payment Methods**: Card, USSD, POS support
5. **Order Tracking**: Delivery status tracking with logistics integration
6. **Dispute System**: Built-in dispute resolution mechanism
7. **Live Streaming**: Product demonstration capabilities
8. **Review System**: Verified purchase reviews and ratings

### Technical Features
1. **Type Safety**: Full TypeScript implementation
2. **Modern React**: Next.js 15 with App Router
3. **Responsive Design**: Mobile-first Tailwind CSS
4. **Component Library**: Shadcn/ui with Radix primitives
5. **API Integration**: RESTful backend with proper error handling
6. **Authentication**: JWT-based auth with role management
7. **Database Optimization**: Proper indexing and relationships
8. **Testing Setup**: Jest configuration for both frontend and backend

---

## 6. Configuration Files

### Build & Development
- **package.json** (root): Backend configuration and scripts
- **frontend/package.json**: Frontend dependencies and scripts
- **backend/tsconfig.json**: Backend TypeScript configuration
- **frontend/tsconfig.json**: Frontend TypeScript configuration
- **frontend/next.config.js**: Next.js configuration with image optimization

### Styling & UI
- **frontend/tailwind.config.js**: Comprehensive design system with custom colors, animations
- **frontend/components.json**: Shadcn/ui configuration
- **frontend/postcss.config.js**: PostCSS configuration

### Testing
- **frontend/jest.config.ts**: Jest testing configuration
- **frontend/eslint.config.mjs**: ESLint configuration

### Environment
- **frontend/.env.example**: Environment variable template

---

## 7. Entry Points & Key Interfaces

### Application Entry Points
1. **Backend Server**: `backend/src/server.ts` (Port 8000)
2. **Frontend App**: `frontend/src/app/page.tsx` (Port 3000)
3. **API Base**: `/api/*` routes for backend services

### Key API Endpoints
- **Authentication**: `/api/auth/*`
- **Products**: `/api/products/*`
- **Orders**: `/api/orders/*`
- **Payments**: `/api/payments/*`

### Database Collections
- **users**: User accounts and seller profiles
- **products**: Product catalog with pre-order info
- **orders**: Order management and tracking
- **payments**: Payment and escrow records

---

## 8. Development & Deployment

### Development Commands
```bash
# Backend
cd backend && npm run dev    # Start backend server
cd backend && npm test       # Run backend tests
cd backend && npm run build  # Build backend

# Frontend  
cd frontend && npm run dev   # Start frontend server
cd frontend && npm test      # Run frontend tests
cd frontend && npm run build # Build frontend
```

### Environment Setup
- Node.js 18+
- MongoDB database
- Paystack API keys
- Environment variables for API URLs and secrets

---

## 9. Testing Strategy

### Backend Testing
- Jest configuration for Node.js environment
- Test files location: `backend/tests/` (structure to be implemented)

### Frontend Testing
- Jest with jsdom environment
- React Testing Library integration
- Test files: `frontend/src/test/`
- Example test: `addition.test.ts`

---

## 10. Documentation & Resources

### Project Documentation
- **README.md**: Main project overview and setup instructions
- **frontend/README.md**: Frontend-specific documentation
- **CODEBASE_INDEX.md**: This comprehensive index

### Code Organization
- Consistent TypeScript interfaces across frontend/backend
- Modular component architecture
- Service layer separation
- Proper error handling and validation
- Database indexing for performance

This index provides a complete overview of the Mesell codebase structure, making it easy to navigate, understand relationships between components, and locate specific functionality for development or maintenance tasks.
