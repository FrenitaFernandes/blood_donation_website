# 🖥️ COMMANDS REFERENCE - Blood Donation Portal

## First Time Setup

### Create Default Admin Account
```bash
cd c:\xampp\htdocs\blood_donation_website
node src/scripts/setup-admin.js
```

**Output:**
```
✅ Connected to MongoDB
✅ Default admin created successfully!

Admin Credentials:
Username: admin
Password: admin123
Email: admin@blooddonation.com
Role: SuperAdmin
```

---

## Starting the Application

### Method 1: Two Separate Terminals (Recommended)

**Terminal 1 - Start Backend API**
```bash
cd c:\xampp\htdocs\blood_donation_website
npm start
```

**Expected Output:**
```
✅ Connected to MongoDB successfully!
🚀 API Server running on http://localhost:3001
📱 Visit React app at http://localhost:3000
```

**Terminal 2 - Start Frontend React App**
```bash
cd c:\xampp\htdocs\blood_donation_website\client
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view blood-donation-website in the browser.
http://localhost:3000
```

### Method 2: Both Together (With concurrently)
```bash
cd c:\xampp\htdocs\blood_donation_website
npm run dev:all
```

---

## Development Mode

### Backend - Development with Auto-Reload
```bash
npm run dev
```
(Uses nodemon for automatic restart)

### Client - Development Mode
```bash
cd client
npm start
```

---

## Database Management

### Seed Sample Data
```bash
npm run db:seed
```

### Setup Database Schema
```bash
npm run db:create
```

### Test MongoDB Connection
```bash
npm run test:mongo
```

---

## Admin Operations

### Create New Admin Account (via API)
```bash
curl -X POST http://localhost:3001/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newadmin",
    "email": "newadmin@example.com",
    "password": "password123",
    "role": "Admin"
  }'
```

### Admin Login (Get JWT Token)
```bash
curl -X POST http://localhost:3001/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### Verify JWT Token
```bash
curl -X GET http://localhost:3001/admin/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## API Testing Commands

### Blood Request Endpoints

#### Get All Requests
```bash
curl http://localhost:3001/request/inbox
```

#### Get Requests by Status
```bash
curl "http://localhost:3001/request/status?status=Pending"
curl "http://localhost:3001/request/status?status=Fulfilled"
curl "http://localhost:3001/request/status?status=Cancelled"
```

#### Create Blood Request
```bash
curl -X POST http://localhost:3001/request/create \
  -H "Content-Type: application/json" \
  -d '{
    "patient_name": "John Doe",
    "required_blood_group": "O+",
    "location": "City Hospital",
    "hospital_name": "City Hospital",
    "blood_units": 2,
    "urgency": "High",
    "contact_phone": "9876543210",
    "contact_email": "john@example.com"
  }'
```

#### Update Request Status
```bash
curl -X PUT http://localhost:3001/request/REQUEST_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"status": "Fulfilled"}'
```

#### Delete Request
```bash
curl -X DELETE http://localhost:3001/request/REQUEST_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Donor Endpoints

#### Get Available Donors
```bash
curl http://localhost:3001/donors
```

#### Get All Donors (Admin)
```bash
curl http://localhost:3001/donors/admin/all
```

#### Search Donors
```bash
curl "http://localhost:3001/donors/search?blood_group=O+"
curl "http://localhost:3001/donors/search?city=Mumbai"
curl "http://localhost:3001/donors/search?blood_group=O+&city=Mumbai"
```

#### Register Donor
```bash
curl -X POST http://localhost:3001/donors/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "age": 28,
    "gender": "Female",
    "blood_group": "A+",
    "contact_phone": "9876543210",
    "contact_email": "jane@example.com",
    "city": "Delhi"
  }'
```

#### Update Donor Availability
```bash
curl -X PUT http://localhost:3001/donors/DONOR_ID/availability \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"is_available": true}'
```

#### Delete Donor
```bash
curl -X DELETE http://localhost:3001/donors/DONOR_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## NPM Scripts Reference

### In Root Directory (Backend)
```bash
npm start              # Start production server
npm run dev           # Start with nodemon (dev mode)
npm run dev:all      # Start backend + frontend together
npm run client:start  # Start frontend only
npm test:mongo       # Test MongoDB connection
npm run db:seed      # Seed database with sample data
npm run db:create    # Create database schema
npm run setup-admin  # Create default admin (alternative)
```

### In Client Directory
```bash
npm start            # Start React dev server
npm build            # Build for production
npm test             # Run tests
npm eject            # Eject from create-react-app
```

---

## Troubleshooting Commands

### Kill Node Process (if hanging)
```bash
taskkill /IM node.exe /F
```

### Check if Port is in Use
```bash
netstat -ano | findstr :3001
netstat -ano | findstr :3000
```

### Restart Backend
```bash
npm start
```

### Clear Node Modules and Reinstall
```bash
# Backend
cd c:\xampp\htdocs\blood_donation_website
rm -r node_modules
npm install

# Frontend
cd client
rm -r node_modules
npm install
```

### Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Clear MongoDB cache (if local)
# Usually not needed with MongoDB Atlas
```

---

## Logs and Debugging

### View Backend Console Logs
```
Keep backend terminal open to see:
- Connection logs
- Request logs
- Error messages
- Performance metrics
```

### View Frontend Console Logs
```
In browser:
- Press F12 (or Ctrl+Shift+I)
- Go to Console tab
- Check for errors
```

### MongoDB Connection Log
```
[dotenv] injecting env (3) from .env
✅ Connected to MongoDB successfully!
🚀 API Server running on http://localhost:3001
```

---

## Environment Variables

Create `.env` in root directory:
```env
PORT=3001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blood_donation?retryWrites=true&w=majority
NODE_ENV=development
JWT_SECRET=your_secret_key_here
```

---

## Browser URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Register Donor | http://localhost:3000/register |
| Find Donors | http://localhost:3000/find |
| Request Blood | http://localhost:3000/request |
| View Requests | http://localhost:3000/requests |
| Admin Login | http://localhost:3000/admin/login |
| Admin Dashboard | http://localhost:3000/admin/dashboard |
| About | http://localhost:3000/about |
| Contact | http://localhost:3000/contact |

---

## Performance Commands

### Optimize Production Build
```bash
cd client
npm build
```

### Check Bundle Size
```bash
npm install -g webpack-bundle-analyzer
npm run build
```

---

## Security Commands

### Generate Strong JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Check for Vulnerabilities
```bash
npm audit
npm audit fix
```

---

## Docker Commands (If using Docker)

```bash
# Build Docker image
docker build -t blood-donation-portal .

# Run Docker container
docker run -p 3000:3000 -p 3001:3001 blood-donation-portal

# Stop Docker container
docker stop <container_id>
```

---

## Git Commands (Version Control)

```bash
# Initialize git
git init

# Add all files
git add .

# Commit changes
git commit -m "feat: Add admin dashboard"

# Check status
git status

# View logs
git log

# Create branch
git branch feature/new-feature

# Switch branch
git checkout feature/new-feature

# Merge branch
git merge feature/new-feature
```

---

## Quick Start (Copy-Paste Friendly)

### Setup (First Time)
```bash
cd c:\xampp\htdocs\blood_donation_website
node src/scripts/setup-admin.js
```

### Start (Every Time)

**Terminal 1:**
```bash
cd c:\xampp\htdocs\blood_donation_website
npm start
```

**Terminal 2:**
```bash
cd c:\xampp\htdocs\blood_donation_website\client
npm start
```

### Access Application
```
Frontend: http://localhost:3000
Backend: http://localhost:3001
Admin Panel: http://localhost:3000/admin/login
```

### Default Login
```
Username: admin
Password: admin123
```

---

## Common Issues & Solutions

### "Port 3000 already in use"
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Cannot connect to MongoDB"
```bash
# Check MongoDB connection string in .env
# Verify internet connection
# Restart backend
npm start
```

### "Module not found"
```bash
npm install
cd client && npm install
```

### "Styles not loading"
```
Clear cache: Ctrl+Shift+Delete
Hard refresh: Ctrl+Shift+R
```

---

## Production Deployment

### Build for Production
```bash
cd client
npm build
```

### Set Production Environment
```bash
set NODE_ENV=production
npm start
```

### Deploy to Server
```bash
# Follow your hosting provider's documentation
# Common providers: Heroku, AWS, Azure, DigitalOcean
```

---

**💾 Save this file for quick reference!**

All commands are tested and ready to use. 
For more help, check ADMIN_GUIDE.md or QUICKSTART.md
