# 🚀 FutureCart - Futuristic E-Commerce Platform

> Experience Tomorrow's Technology Today

A modern, futuristic e-commerce platform built for a hackathon, featuring cutting-edge technology products with **real M-Pesa payments**, **AI assistant**, and a stunning cyberpunk-inspired UI.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![M-Pesa](https://img.shields.io/badge/M--Pesa-Daraja-00A86B?style=for-the-badge)

## ✨ Features

### 🛍️ E-Commerce Functionality
- **Product Catalog** - 8 futuristic products with detailed descriptions
- **Category Filtering** - Browse by Wearables, Workspace, Computing, Smart Home, Health Tech, Accessories
- **Product Detail Pages** - Full product information with quantity selector
- **Shopping Cart** - Add, remove, update quantities with localStorage persistence
- **Cart Badge** - Real-time cart item count in navigation
- **Add to Cart on Homepage** - Quick add from product cards
- **Responsive Design** - Optimized for all devices

### 💳 Payment Integration
- **M-Pesa STK Push** - Real Safaricom Daraja API integration
- **Test Mode** - Charge KSh 1 for testing instead of actual prices
- **Payment Modal** - Beautiful real-time payment status updates
- **Auto-Status Polling** - Checks payment status every 2 seconds
- **Payment Receipts** - M-Pesa receipt display on success

### 🤖 AI Features
- **Gemini AI Assistant** - Floating chat assistant powered by Google Gemini
- **Product Info** - Ask questions about products
- **Future Facts** - Interesting facts about future technology
- **Contextual Responses** - Select products for targeted discussions

### 🎨 Design
- **Futuristic UI** - Cyberpunk-inspired with glassmorphism
- **Gradient Effects** - Cyan, blue, and purple color schemes
- **Glow Animations** - Hover effects and smooth transitions
- **Loading States** - Skeleton screens and spinners
- **Success Feedback** - Toast notifications and animations

---

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **State Management:** React Context API
- **Payments:** Safaricom Daraja M-Pesa API
- **AI:** Google Gemini API
- **Animations:** Framer Motion
- **HTTP Client:** Axios
- **Package Manager:** pnpm

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ installed
- **pnpm** package manager (`npm install -g pnpm`)
- **MongoDB Atlas** account (free tier works)
- **Safaricom Daraja** account (for M-Pesa payments)
- **Google Cloud** account (for Gemini AI)
- **Git** for version control

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd mini-web-hathon
```

### 2️⃣ Install Dependencies

```bash
pnpm install
```

### 3️⃣ Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create a database user with password
4. Whitelist your IP (or use `0.0.0.0/0` for testing)
5. Get your connection string

**Detailed guide:** See `docs/SETUP-MONGODB.md`

### 4️⃣ Set Up Daraja API (M-Pesa)

1. Go to [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
2. Sign up / Log in
3. Create a new app
4. Copy your **Consumer Key** and **Consumer Secret**

**Detailed guide:** See `docs/DARAJA-SETUP-COMPLETE.md`

### 5️⃣ Set Up Google Gemini AI

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Sign in with Google account
3. Click "Get API Key"
4. Create a new API key
5. Copy the key

### 6️⃣ Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/futurecart?retryWrites=true&w=majority

# Daraja API (M-Pesa) Configuration
DARAJA_ENVIRONMENT=sandbox
DARAJA_CONSUMER_KEY=your_consumer_key_here
DARAJA_CONSUMER_SECRET=your_consumer_secret_here
DARAJA_BUSINESS_SHORT_CODE=174379
DARAJA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
DARAJA_CALLBACK_URL=https://your-tunnel-url.com/api/payment/callback
DARAJA_TEST_MODE=true
DARAJA_TEST_AMOUNT=1

# Google Gemini AI Configuration
GOOGLE_API_KEY=your_gemini_api_key_here
```

**Important:** See `.env.example` or `.env.daraja.template` for templates

### 7️⃣ Set Up Public Callback URL (For M-Pesa)

M-Pesa callbacks require a public HTTPS URL. Use one of these options:

**Option A: Localtunnel (Fastest)**
```bash
# Install globally
pnpm add -g localtunnel

# In a NEW terminal, run:
npx localtunnel --port 3000

# Copy the URL and update DARAJA_CALLBACK_URL in .env.local
```

**Option B: Ngrok**
```bash
# Install ngrok (https://ngrok.com/download)
ngrok http 3000

# Copy the HTTPS URL and update DARAJA_CALLBACK_URL
```

**Option C: Cloudflare Tunnel**
```bash
cloudflared tunnel --url http://localhost:3000

# Copy the URL and update DARAJA_CALLBACK_URL
```

**Detailed guide:** See `SETUP-CALLBACK.md`

### 8️⃣ Start the Development Server

```bash
pnpm dev
```

Server will start at [http://localhost:3000](http://localhost:3000)

### 9️⃣ Seed the Database

**Option 1: Using curl**
```bash
curl -X POST http://localhost:3000/api/seed
```

**Option 2: Using browser**
Navigate to: `http://localhost:3000/api/seed`

You should see: `✅ Successfully seeded 8 products!`

### 🔟 Test the Setup

**Test MongoDB Connection:**
```bash
curl http://localhost:3000/api/test-db
```

**Test M-Pesa Payment:**
1. Add items to cart
2. Go to checkout
3. Enter your Safaricom phone number
4. Click "Pay with M-Pesa"
5. Enter M-Pesa PIN (you'll be charged KSh 1)
6. Watch payment confirm! ✨

**Test AI Assistant:**
1. Click the floating chat icon (bottom right)
2. Select a product or ask a general question
3. Get AI-powered responses about future tech!

---

## 📦 Project Structure

```
mini-web-hathon/
├── app/
│   ├── api/
│   │   ├── ai-assistant/         # Gemini AI endpoint
│   │   ├── payment/              # Daraja M-Pesa APIs
│   │   │   ├── initiate/         # STK Push initiation
│   │   │   ├── callback/         # M-Pesa callback handler
│   │   │   └── status/[id]/      # Payment status checker
│   │   ├── products/             # Product CRUD APIs
│   │   │   ├── route.ts          # List products
│   │   │   └── [id]/route.ts     # Get single product
│   │   ├── seed/                 # Database seeding
│   │   └── test-db/              # DB connection test
│   ├── checkout/                 # Checkout page with M-Pesa
│   ├── product/[id]/             # Dynamic product pages
│   ├── layout.tsx                # Root layout with CartProvider
│   ├── page.tsx                  # Homepage with AI assistant
│   └── globals.css               # Global styles & animations
├── components/
│   ├── AIAssistant.tsx           # Gemini AI chat component
│   ├── CartSidebar.tsx           # Shopping cart sidebar
│   ├── NavBar.tsx                # Navigation with cart badge
│   ├── PaymentModal.tsx          # M-Pesa payment UI
│   └── ProductCard.tsx           # Product card with Add to Cart
├── contexts/
│   └── CartContext.tsx           # Global cart state
├── lib/
│   ├── daraja.ts                 # Daraja API utilities
│   ├── mongodb.ts                # MongoDB connection
│   └── seed-data.ts              # Product seed data
├── models/
│   └── Product.ts                # Mongoose Product schema
├── public/
│   └── products/                 # Product images (8 items)
└── docs/
    ├── PRD.md                    # Product Requirements
    ├── DARAJA-SETUP-COMPLETE.md  # M-Pesa setup guide
    ├── DARAJA-INTEGRATION-TODO.md # Integration checklist
    └── CALLBACK-SOLUTIONS.md     # Callback URL solutions
```

---

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Start dev server at localhost:3000
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Database
curl -X POST http://localhost:3000/api/seed       # Seed products
curl http://localhost:3000/api/test-db            # Test MongoDB
curl http://localhost:3000/api/products           # List products

# M-Pesa Testing
curl -X POST http://localhost:3000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{"phone":"254712345678","amount":1,"customerName":"Test","customerEmail":"test@example.com"}'
```

---

## 📱 Product Catalog

The store features **8 futuristic products** in KSh:

| Product | Category | Price | Description |
|---------|----------|-------|-------------|
| **NeuroLink Band** | Wearables | KSh 89,900 | Brain-computer interface wristband |
| **HoloDesk Pro** | Workspace | KSh 249,900 | Holographic workspace projector |
| **QuantumCore CPU** | Computing | KSh 499,900 | Personal quantum processor |
| **AirClean Nano** | Smart Home | KSh 59,900 | AI-powered air purifier |
| **SmartGlass AR Pro** | Wearables | KSh 129,900 | Augmented reality glasses |
| **BioPod Sleep System** | Health Tech | KSh 379,900 | AI sleep optimization pod |
| **NanoBot Cleaner** | Smart Home | KSh 44,900 | Microscopic cleaning robots |
| **PhotonCharge Station** | Accessories | KSh 29,900 | Wireless quantum charging hub |

---

## 🎨 Design System

### Color Palette
- **Primary:** Cyan (#00D9FF) / Blue (#3B82F6)
- **Secondary:** Purple (#B91CFF)
- **Accent:** Emerald (#10B981)
- **Success:** Green (#22C55E)
- **Background:** Slate 950-900
- **Text:** White / Slate 300

### Components
- **Glassmorphism:** `backdrop-blur-xl` with transparency
- **Gradients:** `from-cyan-500 to-blue-600`
- **Shadows:** Colored shadows for glow effects
- **Animations:** 300ms transitions, pulse effects
- **Typography:** Inter font family

---

## 🔄 User Flow

### Shopping Flow
1. **Browse** → Homepage with 8 products + category filters
2. **Filter** → Click category to filter products
3. **Quick Add** → Add to cart directly from product cards
4. **View Details** → Click product for full information
5. **Adjust Quantity** → Select quantity on detail page
6. **Add to Cart** → Items added to cart with feedback
7. **Review Cart** → Click cart icon to review & edit
8. **Checkout** → Enter details + phone number
9. **Pay with M-Pesa** → STK Push to phone
10. **Confirm** → Enter PIN and complete payment
11. **Success** → Order confirmed, cart cleared

### AI Assistant Flow
1. **Open Chat** → Click floating button (bottom right)
2. **Select Product** → Choose from grid or ask general question
3. **Ask Question** → Type question about products/future
4. **Get Response** → AI provides detailed, engaging answers
5. **Continue** → Ask follow-ups or switch products

---

## 🗄️ Database Schema

### Products Collection
```typescript
{
  _id: ObjectId,
  name: string,           // Product name
  description: string,    // Detailed description (500 chars)
  price: number,          // Price in KSh
  category: string,       // Category name
  image: string,          // Image path (/products/name.png)
  stock: number,          // Available quantity
  featured: boolean,      // Featured flag
  createdAt: Date         // Creation timestamp
}
```

---

## 🧪 Testing M-Pesa Payments

### Test Mode Configuration
In `.env.local`:
```env
DARAJA_TEST_MODE=true
DARAJA_TEST_AMOUNT=1
```

This charges **KSh 1** instead of the actual cart total.

### Test Flow
1. Add products worth KSh 379,900
2. Go to checkout
3. Enter Safaricom number: `0712345678`
4. Click "Pay with M-Pesa"
5. **You'll be charged KSh 1 only**
6. Enter PIN on your phone
7. Payment confirms automatically!

### Payment Status
- **Pending:** Waiting for PIN entry
- **Success:** Payment completed (M-Pesa receipt shown)
- **Failed:** Payment cancelled or timed out

---

## 🤖 AI Assistant Usage

The Gemini AI assistant helps users learn about products and future technology.

### Example Prompts
- "Tell me about the NeuroLink Band"
- "How does quantum computing work in the QuantumCore CPU?"
- "What's the future of augmented reality?"
- "Compare the BioPod vs traditional sleep systems"

### Features
- **Product Context:** Knows all 8 products
- **Engaging Tone:** Futuristic, exciting responses
- **Concise:** 2-3 sentence answers
- **Emojis:** Tech-themed emojis for engagement

---

## 🚧 Hackathon Scope & Limitations

Built in **2 hours** with focus on core functionality:

### ✅ Implemented
- Complete product catalog with MongoDB
- Shopping cart with persistence
- Real M-Pesa payment integration (test mode)
- AI assistant with Gemini API
- Responsive, modern UI
- Category filtering
- Product detail pages
- Real-time payment status
- Cart management

### ❌ Not Implemented (Out of Scope)
- User authentication
- Order history in database
- Admin panel
- Product search
- Product reviews
- Multiple payment methods
- Inventory management
- Email notifications
- Advanced analytics

---

## 📝 API Endpoints

### Products
- `GET /api/products` - List all products (optional `?category=`)
- `GET /api/products/[id]` - Get single product
- `POST /api/seed` - Seed database with products

### Payments
- `POST /api/payment/initiate` - Initiate STK Push
- `POST /api/payment/callback` - M-Pesa callback handler
- `GET /api/payment/status/[id]` - Check payment status

### AI
- `POST /api/ai-assistant` - Chat with Gemini AI

### Utility
- `GET /api/test-db` - Test MongoDB connection

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Test connection
curl http://localhost:3000/api/test-db

# Common fixes:
# 1. Check MONGODB_URI in .env.local
# 2. Whitelist IP in MongoDB Atlas
# 3. Check username/password
```

### M-Pesa 403 Error
```bash
# Causes:
# 1. Invalid Consumer Key/Secret
# 2. App not active in Daraja portal
# 3. Wrong environment (sandbox vs production)

# Fix:
# 1. Regenerate keys at developer.safaricom.co.ke
# 2. Update .env.local
# 3. Restart server
```

### Callback Not Working
```bash
# M-Pesa callbacks need public HTTPS URL
# Solution: Use localtunnel/ngrok (see SETUP-CALLBACK.md)

# Quick fix:
npx localtunnel --port 3000
# Copy URL → Update DARAJA_CALLBACK_URL → Restart server
```

### AI Assistant Not Responding
```bash
# Check GOOGLE_API_KEY in .env.local
# Get new key at: https://ai.google.dev/
```

---

## 📖 Additional Documentation

- **`docs/PRD.md`** - Product Requirements Document
- **`docs/SETUP-MONGODB.md`** - MongoDB Atlas setup guide
- **`docs/DARAJA-SETUP-COMPLETE.md`** - Complete M-Pesa integration guide
- **`docs/DARAJA-INTEGRATION-TODO.md`** - Integration checklist
- **`SETUP-CALLBACK.md`** - Callback URL setup options
- **`docs/CALLBACK-SOLUTIONS.md`** - Alternative callback solutions

---

## 🎯 Key Achievements

Built in a **2-hour hackathon**, this project demonstrates:

✅ Full-stack Next.js development  
✅ MongoDB integration with Mongoose  
✅ Real payment API integration (Daraja)  
✅ AI integration (Google Gemini)  
✅ Modern React patterns (Context API, Hooks)  
✅ Responsive design with Tailwind CSS  
✅ API route development  
✅ Real-time status updates  
✅ Complex state management  
✅ Production-ready code structure  

---

## 🤝 Contributing

This is a hackathon project, but contributions are welcome! Feel free to:
- Fork the repository
- Create a feature branch
- Submit a pull request

---

## 📄 License

MIT License - Feel free to use this project for learning, hackathons, or personal projects!

---

## 🙏 Acknowledgments

- **Next.js** - React framework
- **MongoDB Atlas** - Cloud database
- **Safaricom Daraja** - M-Pesa API
- **Google Gemini** - AI capabilities
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Vercel** - Next.js creators

---

## 📞 Support

For issues or questions:
1. Check the documentation in `/docs`
2. Review troubleshooting section above
3. Open an issue on GitHub

---

**Built with ⚡ for a hackathon** | **FutureCart - Tomorrow's Tech, Today** 🚀

*Powered by Next.js, MongoDB, M-Pesa, and Gemini AI*
