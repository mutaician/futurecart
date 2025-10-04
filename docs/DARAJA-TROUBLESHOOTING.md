# 🔍 Daraja API Troubleshooting

## Error 403: Forbidden (Failed to get access token)

### Possible Causes:

#### 1. **App Not Approved in Daraja Portal** ✅ Most Common
Your app needs to be **activated** in the Safaricom Developer Portal.

**Solution:**
1. Go to: https://developer.safaricom.co.ke/MyApps
2. Find your app
3. Check if it shows "Active" status
4. If not, you may need to wait for approval OR create a new app

#### 2. **Wrong API Keys**
The Consumer Key/Secret might be incorrect.

**Solution:**
1. Go to: https://developer.safaricom.co.ke/MyApps
2. Click on your app
3. **Regenerate** the Consumer Key and Secret
4. Copy the NEW values
5. Update `.env.local`:
   ```env
   DARAJA_CONSUMER_KEY=your_new_key_here
   DARAJA_CONSUMER_SECRET=your_new_secret_here
   ```
6. Restart server: `pnpm dev`

#### 3. **Production Keys Used in Sandbox**
You might have production keys but set environment to sandbox.

**Solution:**
Check your `.env.local`:
```env
DARAJA_ENVIRONMENT=sandbox  # Should match your app type
```

If your keys are from a **production** app, change to:
```env
DARAJA_ENVIRONMENT=production
```

---

## Quick Test: Verify Credentials

Let me create a test endpoint to verify your credentials:

### Test Your Setup:
```bash
# After restarting server, test this:
curl http://localhost:3000/api/test-daraja
```

This will tell you if your credentials work!

---

## Recommended Solution for Hackathon

If Daraja keeps giving issues, here's a **quick workaround**:

### Create a Demo Payment Mode

Add this to `.env.local`:
```env
DARAJA_DEMO_MODE=true
```

This will:
- ✅ Skip real API calls
- ✅ Show payment modal with demo success
- ✅ Auto-confirm after 5 seconds
- ✅ Perfect for demo/presentation!

Would you like me to implement this? It takes 2 minutes and guarantees your demo works!

---

## Current Callback URL Check

Your callback URL should be:
```env
# Option 1: Use webhook.site (get a real URL from https://webhook.site)
DARAJA_CALLBACK_URL=https://webhook.site/your-unique-id

# Option 2: Use any placeholder (polling will work instead)
DARAJA_CALLBACK_URL=https://mydomain.com/callback
```

The app uses **status polling**, so the callback URL just needs to be valid HTTPS.

---

## Need Help?

### Option A: Fix Daraja (If you have time)
1. Check app status at developer.safaricom.co.ke
2. Regenerate credentials
3. Update `.env.local`
4. Restart server

### Option B: Demo Mode (Fastest - 2 minutes)
I can create a demo mode that:
- Shows realistic payment flow
- Auto-confirms after 5 seconds
- Perfect for hackathon presentation
- No API issues!

**Let me know which option you prefer!** 🚀

