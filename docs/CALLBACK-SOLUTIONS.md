# 🌐 Daraja Callback Solutions for Localhost

## The Problem
M-Pesa callbacks can't reach `localhost:3000`. You need a **public HTTPS URL**.

---

## ✅ Solution 1: Localtunnel (FASTEST - No signup!)

### Install & Run:
```bash
# Install globally
pnpm add -g localtunnel

# In a NEW terminal, run:
lt --port 3000
```

You'll get a URL like: `https://lazy-cats-12345.loca.lt`

### Update .env.local:
```env
DARAJA_CALLBACK_URL=https://lazy-cats-12345.loca.lt/api/payment/callback
```

### Restart server:
```bash
pnpm dev
```

**That's it!** Callbacks will now work.

---

## ✅ Solution 2: Cloudflare Tunnel (Also free, no signup)

### Install:
```bash
# Download cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared

# Run tunnel
cloudflared tunnel --url http://localhost:3000
```

You'll get: `https://random-name.trycloudflare.com`

### Update .env.local:
```env
DARAJA_CALLBACK_URL=https://random-name.trycloudflare.com/api/payment/callback
```

---

## ✅ Solution 3: Ngrok (Most popular, needs account)

### Setup:
1. Sign up: https://ngrok.com/
2. Install:
   ```bash
   # Arch/Manjaro
   yay -S ngrok
   # Or download from ngrok.com
   ```
3. Auth:
   ```bash
   ngrok config add-authtoken YOUR_TOKEN
   ```
4. Run:
   ```bash
   ngrok http 3000
   ```

You'll get: `https://abc123.ngrok-free.app`

### Update .env.local:
```env
DARAJA_CALLBACK_URL=https://abc123.ngrok-free.app/api/payment/callback
```

---

## ✅ Solution 4: Demo Mode (2 minutes, guaranteed!)

If you're short on time, I can create a **demo mode** that:
- ✅ Simulates successful payment after 5 seconds
- ✅ No callbacks needed
- ✅ Perfect for hackathon demo
- ✅ Looks 100% real

### Want this? I'll implement it now!

Just add to `.env.local`:
```env
DARAJA_DEMO_MODE=true
```

And the app will auto-confirm payments for demo purposes.

---

## 🎯 My Recommendation for Hackathon

**Use Localtunnel** - It's the fastest:

```bash
# Terminal 1: Your Next.js server
pnpm dev

# Terminal 2: Localtunnel
pnpm add -g localtunnel
lt --port 3000
```

Copy the URL, update `.env.local`, restart server. Done! ✨

---

## Quick Test After Setup

1. Add items to cart
2. Go to checkout
3. Enter phone: 0712345678
4. Click "Pay with M-Pesa"
5. Enter PIN on phone
6. **Watch callback arrive and status update!** 🎉

---

Let me know which solution you want to try! 🚀

