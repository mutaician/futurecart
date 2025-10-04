# MongoDB Atlas Setup Instructions

## Quick Setup (5 minutes)

### 1. Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with Google/GitHub (fastest) or email
3. Choose **FREE** tier (M0 Sandbox)

### 2. Create a Cluster
1. Click "Build a Database"
2. Choose **FREE** shared cluster (M0)
3. Select a cloud provider and region (any is fine)
4. Cluster name: `FutureCart` (or keep default)
5. Click "Create Cluster" (takes 1-3 minutes)

### 3. Create Database User
1. Security → Database Access
2. Click "Add New Database User"
3. **Authentication Method**: Password
4. Username: `futurecart`
5. Password: (generate or create a simple one - **save this!**)
6. **Database User Privileges**: Read and write to any database
7. Click "Add User"

### 4. Configure Network Access
1. Security → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for hackathon only!)
4. Click "Confirm"

### 5. Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. **Driver**: Node.js
5. **Version**: 5.5 or later
6. Copy the connection string (looks like):
   ```
   mongodb+srv://futurecart:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 6. Update .env.local
1. Open `.env.local` in your project
2. Replace `<username>` with your username (e.g., `futurecart`)
3. Replace `<password>` with your actual password
4. Replace `<cluster>` with your cluster name (e.g., `cluster0.xxxxx`)
5. Add database name before the `?`: `/futurecart?retryWrites=true`

**Example**:
```
MONGODB_URI=mongodb+srv://futurecart:MyPassword123@cluster0.abc123.mongodb.net/futurecart?retryWrites=true&w=majority
```

### 7. Test Connection
```bash
pnpm run dev
```

Then open: `http://localhost:3000/api/test-db`

You should see:
```json
{"success": true, "message": "✅ MongoDB connection successful!"}
```

---

## ✅ Phase 1 Complete!
Once you see the success message, proceed to **Phase 2: Data Models & Seed Data**

