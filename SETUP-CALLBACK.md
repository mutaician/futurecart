# 🔧 Setup M-Pesa Callbacks - Quick Guide

## Choose ONE option below:

---

## ✅ OPTION 1: Localtunnel (Easiest - No signup!)

### Step 1: Install Localtunnel
```bash
pnpm add -g localtunnel
```

### Step 2: Open a NEW Terminal
Open a second terminal window/tab

### Step 3: Run Localtunnel
```bash
npx localtunnel --port 3000
```

You'll see output like:
```
your url is: https://happy-dogs-12345.loca.lt
```

### Step 4: Copy Your URL
Copy the URL from the output (e.g., `https://happy-dogs-12345.loca.lt`)

### Step 5: Update .env.local
Open `.env.local` and update this line:
```env
DARAJA_CALLBACK_URL=https://happy-dogs-12345.loca.lt/api/payment/callback
```
(Replace with YOUR actual URL)

### Step 6: Restart Your Dev Server
In your original terminal:
```bash
# Press Ctrl+C to stop
# Then restart:
pnpm dev
```

### Step 7: Test Payment!
1. Add items to cart
2. Go to checkout
3. Enter your phone number
4. Pay with M-Pesa
5. Enter PIN
6. ✅ Payment should confirm automatically!

---

## ✅ OPTION 2: Cloudflare Tunnel (Also free!)

### Step 1: Install Cloudflared
```bash
yay -S cloudflared
# Or download from: https://github.com/cloudflare/cloudflared/releases
```

### Step 2: Run Tunnel (in NEW terminal)
```bash
cloudflared tunnel --url http://localhost:3000
```

You'll see:
```
https://random-name-abc.trycloudflare.com
```

### Step 3: Update .env.local
```env
DARAJA_CALLBACK_URL=https://random-name-abc.trycloudflare.com/api/payment/callback
```

### Step 4: Restart Server
```bash
pnpm dev
```

---

## ✅ OPTION 3: Ngrok (Most popular)

### Step 1: Install
```bash
yay -S ngrok
# Or download from: https://ngrok.com/download
```

### Step 2: Sign up & Auth
1. Go to: https://ngrok.com/
2. Sign up (free)
3. Get your authtoken
4. Run:
```bash
ngrok config add-authtoken YOUR_TOKEN_HERE
```

### Step 3: Start Ngrok (in NEW terminal)
```bash
ngrok http 3000
```

You'll see:
```
Forwarding: https://abc123.ngrok-free.app -> http://localhost:3000
```

### Step 4: Update .env.local
```env
DARAJA_CALLBACK_URL=https://abc123.ngrok-free.app/api/payment/callback
```

### Step 5: Restart Server
```bash
pnpm dev
```

---

## 🎯 My Recommendation

**Use Localtunnel (Option 1)** - It's the fastest and requires no signup!

---

## 📋 Summary of What You Need

1. **Two terminal windows open:**
   - Terminal 1: Your Next.js server (`pnpm dev`)
   - Terminal 2: Tunnel tool (localtunnel/ngrok/cloudflared)

2. **Both must stay running** while testing

3. **Update .env.local** with the tunnel URL

4. **Restart the dev server** after updating .env.local

---

## 🐛 If It Doesn't Work

The payment will still work because of **status polling**. The modal polls Daraja every 2 seconds to check payment status. Callbacks just make it faster.

**Current behavior without callbacks:**
- User pays → Modal shows "waiting..." 
- Modal polls status every 2 seconds
- After ~5-30 seconds, Daraja returns success
- Modal updates and shows success ✅

**With callbacks working:**
- User pays → Callback arrives immediately
- Modal shows success in 2-3 seconds ⚡

---

## ✨ Quick Test

After setup:
```bash
# Terminal 1
pnpm dev

# Terminal 2  
npx localtunnel --port 3000
# Copy the URL, update .env.local, restart Terminal 1
```

Then test payment flow! 🚀

