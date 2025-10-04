# 🚀 FutureCart - Futuristic E-Commerce Platform

> Experience Tomorrow's Technology Today

A modern, futuristic e-commerce platform built for a hackathon, specializing in cutting-edge technology products with AI-powered gadgets, smart home devices, and next-generation tech.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)

## ✨ Features

### Core Functionality
- 🛍️ **Product Catalog** - 8 futuristic products with AI-generated images
- 🔍 **Category Filtering** - Filter by Wearables, Workspace, Computing, Smart Home, etc.
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🛒 **Shopping Cart** - Add, remove, and update quantities
- 💾 **Cart Persistence** - Cart saves to localStorage
- 💳 **Checkout Flow** - Simple checkout with order summary
- 🎨 **Futuristic UI** - Glassmorphism, gradients, and glow effects

### Technical Features
- ⚡ Next.js 14 with App Router
- 🗄️ MongoDB Atlas for product storage
- 🎨 Tailwind CSS for styling
- 🔄 React Context for state management
- 📦 pnpm package manager
- 🌐 API Routes for data fetching

## 🏗️ Project Structure

```
mini-web-hathon/
├── app/
│   ├── api/
│   │   ├── products/          # Product API routes
│   │   ├── seed/              # Database seeding
│   │   └── test-db/           # DB connection test
│   ├── checkout/              # Checkout page
│   ├── product/[id]/          # Dynamic product pages
│   ├── layout.tsx             # Root layout with CartProvider
│   ├── page.tsx               # Homepage
│   └── globals.css            # Global styles
├── components/
│   ├── CartSidebar.tsx        # Shopping cart sidebar
│   ├── NavBar.tsx             # Navigation with cart button
│   └── ProductCard.tsx        # Product card component
├── contexts/
│   └── CartContext.tsx        # Cart state management
├── lib/
│   ├── mongodb.ts             # MongoDB connection
│   └── seed-data.ts           # Product seed data
├── models/
│   └── Product.ts             # Mongoose Product schema
├── public/
│   └── products/              # Product images
└── docs/
    └── PRD.md                 # Product Requirements Document
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mini-web-hathon
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/futurecart?retryWrites=true&w=majority
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   > **Note:** See `SETUP-MONGODB.md` for detailed MongoDB Atlas setup instructions

4. **Seed the database**
   
   Start the dev server:
   ```bash
   pnpm dev
   ```
   
   Then seed the database:
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```
   
   Or visit: `http://localhost:3000/api/seed` in your browser and refresh

5. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Product Catalog

The store features 8 futuristic products:

1. **NeuroLink Band** - Brain-computer interface wristband ($899)
2. **HoloDesk Pro** - Holographic workspace projector ($2,499)
3. **QuantumCore CPU** - Personal quantum processor ($4,999)
4. **AirClean Nano** - AI-powered air purifier ($599)
5. **SmartGlass AR Pro** - Augmented reality glasses ($1,299)
6. **BioPod Sleep System** - AI sleep optimization pod ($3,799)
7. **NanoBot Cleaner** - Microscopic cleaning robots ($449)
8. **PhotonCharge Station** - Wireless quantum charging hub ($299)

## 🛠️ Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Build
pnpm build        # Build for production
pnpm start        # Start production server

# Database
curl -X POST http://localhost:3000/api/seed    # Seed database
curl http://localhost:3000/api/test-db         # Test DB connection
```

## 🎨 Design System

### Color Palette
- **Primary:** Cyan/Blue (#00D9FF)
- **Secondary:** Purple (#B91CFF)
- **Accent:** Emerald (#00FF94)
- **Background:** Slate 950-900
- **Text:** White/Slate

### UI Components
- Glassmorphism cards with backdrop blur
- Gradient backgrounds and borders
- Glow effects on hover
- Smooth transitions (300ms)
- Rounded corners (xl, 2xl)
- Shadow effects for depth

## 🔄 User Flow

1. **Browse Products** → Homepage with category filters
2. **View Details** → Click product card for full details
3. **Add to Cart** → Select quantity and add
4. **Review Cart** → Click cart icon to review items
5. **Checkout** → Enter name and email
6. **Order Confirmation** → Success message (demo)

## 🗄️ Database Schema

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  featured: Boolean,
  createdAt: Date
}
```

## 🚧 Limitations (Hackathon Scope)

This is a hackathon project with simplified features:

- ❌ No authentication/user accounts
- ❌ Orders not saved to database
- ❌ No actual payment processing
- ❌ No order tracking
- ❌ Basic form validation only
- ✅ Focus on core e-commerce functionality

## 📝 Development Timeline

Built in **2 hours** following a modular approach:

- ✅ Phase 1: Project Setup & Database (15 min)
- ✅ Phase 2: Data Models & Seed Data (15 min)
- ✅ Phase 3: Home Page & Product Listing (40 min)
- ✅ Phase 4: Product Detail Page (20 min)
- ✅ Phase 5: Shopping Cart & Checkout (35 min)
- ✅ Phase 6: Polish, Git & Final Touches (15 min)

## 🤝 Contributing

This is a hackathon project, but feel free to fork and experiment!

## 📄 License

MIT License - feel free to use this project for learning or hackathons!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database by [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Product images generated with AI

---

**Built with ⚡ for a hackathon** | **FutureCart - Tomorrow's Tech, Today**
