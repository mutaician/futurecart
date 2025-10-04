# 🚀 Daraja API Integration TODO List

## Overview
Integrate **REAL M-Pesa Daraja API** (STK Push) with **KSh 1 test amount** for hackathon demo.
- Uses actual Daraja API
- Charges only KSh 1 instead of real product prices (for testing)
- Real STK push on user's phone
- Real payment confirmation

---

## ✅ TODO List

### **Phase 1: Setup & Environment (5 minutes)**

- [ ] **Step 1.1**: YOU - Get Daraja API credentials (see below)
- [ ] **Step 1.2**: YOU - Add credentials to `.env.local`
- [ ] **Step 1.3**: ME - Install axios (for API calls)
- [ ] **Step 1.4**: ME - Create Daraja API utility functions

---

### **Phase 2: Backend API Routes (20 minutes)**

- [ ] **Step 2.1**: ME - Create `/api/payment/initiate` route
  - Gets OAuth token from Daraja
  - Initiates STK Push with **KSh 1** (test amount)
  - Returns transaction ID
  - Saves order details temporarily

- [ ] **Step 2.2**: ME - Create `/api/payment/callback` route
  - Receives M-Pesa callback (webhook)
  - Validates payment confirmation
  - Updates payment status

- [ ] **Step 2.3**: ME - Create `/api/payment/status/[id]` route
  - Checks payment status by transaction ID
  - Frontend polls this endpoint

---

### **Phase 3: Frontend Integration (20 minutes)**

- [ ] **Step 3.1**: ME - Update checkout page
  - Add M-Pesa payment option
  - Add phone number input (254XXXXXXXXX format)
  - Show test amount notice: "Testing with KSh 1"

- [ ] **Step 3.2**: ME - Create PaymentModal component
  - Shows "Check your phone for STK push"
  - Displays payment status (pending/success/failed)
  - Polls status every 2 seconds

- [ ] **Step 3.3**: ME - Handle payment flow
  - On success: Clear cart, show confirmation
  - On failure: Show error, allow retry
  - Display actual amount vs test amount

---

### **Phase 4: Testing & Polish (5 minutes)**

- [ ] **Step 4.1**: TEST - You test with real phone number
- [ ] **Step 4.2**: ME - Add error handling
- [ ] **Step 4.3**: ME - Add payment receipt display

---

## 🔑 What YOU Need to Do (REQUIRED)

### **Step 1: Get Daraja API Credentials**

#### Option A: Safaricom Sandbox (Recommended - Faster)
1. Go to: **https://developer.safaricom.co.ke/**
2. Sign up / Log in
3. Create a new app (any name)
4. Go to **"My Apps"** and select your app
5. Copy these credentials:
   - **Consumer Key**
   - **Consumer Secret**
   - **Test Credentials** (for sandbox)

#### Option B: Production (Slower - Need business approval)
- Requires business registration
- Takes 1-2 days for approval
- **Not recommended for hackathon**

---

### **Step 2: Add to `.env.local`**

Copy and paste this into your `.env.local` file:

```env
# Daraja API Configuration
DARAJA_ENVIRONMENT=sandbox
# ^ Use "sandbox" for testing, "production" for real business

# Get these from https://developer.safaricom.co.ke/
DARAJA_CONSUMER_KEY=your_consumer_key_here
DARAJA_CONSUMER_SECRET=your_consumer_secret_here

# Sandbox Test Credentials (provided by Safaricom)
DARAJA_BUSINESS_SHORT_CODE=174379
DARAJA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919

# Callback URL (for local testing, we'll use ngrok later)
DARAJA_CALLBACK_URL=http://localhost:3000/api/payment/callback

# Test Mode - Charge KSh 1 instead of actual prices
DARAJA_TEST_MODE=true
DARAJA_TEST_AMOUNT=1
```

**Important Notes:**
- The `BUSINESS_SHORT_CODE` and `PASSKEY` above are **Safaricom sandbox defaults**
- They work for testing with any Safaricom number
- You only need to fill in `CONSUMER_KEY` and `CONSUMER_SECRET`

---

### **Step 3: For Callback Testing (Optional but Recommended)**

Since M-Pesa needs to call your callback URL, you need a public URL:

1. Install ngrok: `https://ngrok.com/download`
2. Run: `ngrok http 3000`
3. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
4. Update `.env.local`:
   ```env
   DARAJA_CALLBACK_URL=https://abc123.ngrok.io/api/payment/callback
   ```

**OR** for quick hackathon demo: Skip this and I'll show mock confirmation!

---

## 📋 Implementation Details

### What I'll Build:

#### 1. **Daraja Utility** (`/lib/daraja.ts`)
- OAuth token generation
- STK Push initiation
- Amount override (KSh 1 in test mode)

#### 2. **Payment Initiation** (`/api/payment/initiate`)
```typescript
POST /api/payment/initiate
Body: { phone: "254712345678", amount: 89900, orderId: "..." }
Response: { success: true, checkoutRequestId: "...", testAmount: 1 }
```

#### 3. **Payment Status** (`/api/payment/status/[id]`)
```typescript
GET /api/payment/status/ws_CO_123456789
Response: { status: "pending|success|failed", message: "..." }
```

#### 4. **Payment Modal**
- Real-time status updates
- Shows: "Paying KSh 1 (Test amount for KSh 89,900 order)"
- Instructions: "Check your phone and enter M-Pesa PIN"

---

## 🎯 User Flow

1. User adds products to cart (e.g., KSh 89,900 total)
2. Goes to checkout, enters phone number (254712345678)
3. Clicks "Pay with M-Pesa"
4. **UI shows**: "Testing mode: Paying KSh 1 instead of KSh 89,900"
5. **Real STK push** sent to user's phone for **KSh 1**
6. User enters M-Pesa PIN on phone
7. Payment confirms
8. Order marked as paid, cart cleared

---

## ⏱️ Estimated Time
- **Get API Keys**: 15 minutes (if sandbox)
- **Implementation**: 45 minutes
- **Testing**: 10 minutes
- **Total**: ~70 minutes

---

## 🚀 Ready to Start?

**Once you have your Daraja credentials:**
1. Add them to `.env.local`
2. Tell me you're ready
3. I'll implement everything!

**Need help getting credentials?** Let me know and I can guide you through the Safaricom Developer Portal! 🎉

