# Quick Start Guide - Blood Donation Portal

## 🚀 Start the Application

### Step 1: Start Backend Server (Terminal 1)
```bash
cd c:\xampp\htdocs\blood_donation_website
npm start
```

Expected output:
```
✅ Connected to MongoDB successfully!
🚀 API Server running on http://localhost:3001
📱 Visit React app at http://localhost:3000
```

### Step 2: Start Frontend (Terminal 2)
```bash
cd c:\xampp\htdocs\blood_donation_website\client
npm start
```

The React app will open at `http://localhost:3000`

---

## 🔐 Admin Login

### Default Credentials
- **URL**: http://localhost:3000/admin/login
- **Username**: `admin`
- **Password**: `admin123`

### First Time Setup
If admin doesn't exist, run:
```bash
node src/scripts/setup-admin.js
```

---

## 📋 Admin Dashboard Tasks

### Manage Blood Requests
1. Click "Blood Requests" tab
2. Filter by status: All, Pending, Fulfilled, Cancelled
3. Actions:
   - ✅ Mark as Fulfilled (when blood is provided)
   - ❌ Cancel (if no longer needed)
   - 🗑️ Delete (remove permanently)

### Manage Donors
1. Click "Manage Donors" tab
2. For each donor:
   - 🔘 Toggle availability (ON = Available, OFF = Unavailable)
   - 🗑️ Delete profile (permanent removal)

---

## 👥 User Features

### Register as Donor
- Click "Register as Donor"
- Fill form with details
- Blood group, city, contact info
- Account created with available status (✅)

### Find Donors
- Click "Find Donors"
- Search by blood group, city, or view all
- See donor cards with:
  - Name (grayed out if unavailable)
  - Blood group, age, city
  - Contact information
  - Availability toggle
- Toggle your own availability if you're a registered donor

### Request Blood
- Click "Request Blood"
- Enter patient details
- Select urgency level
- Hospital information
- Request created with Pending status
- Admin will manage and update status

### View Requests
- Click "View Requests"
- See all current blood requests
- Status shown with color coding
- Contact information for each request

---

## 🎨 Design Notes

### Colors Used
- **Red (#c41e3a)**: Primary (blood donation theme)
- **Green (#388e3c)**: Fulfilled/Available
- **Yellow (#fbc02d)**: Pending
- **Orange (#f57c00)**: High urgency
- **Dark Red (#d32f2f)**: Critical/Cancel/Delete

### Responsive Design
- Mobile-friendly layouts
- Grid adjusts for all screen sizes
- Touch-friendly buttons and toggles

---

## 📊 Key Metrics

### Blood Requests Status
- **Pending**: Awaiting fulfillment
- **Fulfilled**: Blood was provided
- **Cancelled**: Request no longer needed

### Donor Availability
- **Available (✅)**: Can be contacted for donation
- **Unavailable (⏸)**: Temporarily paused (can reactivate)

---

## 🔧 Troubleshooting

### Server Won't Start
```bash
# Kill any existing processes
taskkill /IM node.exe /F

# Try again
npm start
```

### MongoDB Connection Error
- Check if MongoDB is running
- Verify MONGO_URI in .env file
- Ensure internet connection is active

### Admin Login Fails
```bash
# Recreate admin account
node src/scripts/setup-admin.js
```

### Styles Not Loading
- Clear browser cache: `Ctrl+Shift+Delete`
- Hard refresh: `Ctrl+Shift+R`

### React App Won't Start
```bash
cd client
npm install
npm start
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## 🔒 Security Features

- ✅ Password hashing (bcryptjs)
- ✅ JWT token authentication
- ✅ 24-hour session expiry
- ✅ CORS enabled
- ✅ Input validation
- ✅ Error handling

---

## 📞 Common Tasks

### Create New Admin
```bash
# Manually in MongoDB or via API
# POST http://localhost:3001/admin/register
{
  "username": "newadmin",
  "email": "newadmin@example.com",
  "password": "securepassword",
  "role": "Admin"
}
```

### Export Requests
- View requests in admin dashboard
- Copy request details manually
- Or query MongoDB directly

### Backup Database
- Use MongoDB Atlas backup feature
- Or export collections via MongoDB Compass

---

## 🚀 Production Checklist

Before deploying:
- [ ] Change default admin password
- [ ] Update MongoDB URI
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Setup email notifications
- [ ] Configure production environment
- [ ] Enable security headers
- [ ] Setup logging and monitoring
- [ ] Backup database regularly
- [ ] Test all features

---

## 📚 Documentation

- **ADMIN_GUIDE.md** - Complete feature guide
- **IMPLEMENTATION_SUMMARY.md** - Technical details
- **README.md** - Original project info

---

## 💡 Tips & Tricks

1. **Search Optimization**: Filter donors by city first, then blood group
2. **Request Management**: Always mark as Fulfilled before deleting
3. **Donor Engagement**: Use availability toggle instead of deleting
4. **Admin Tips**: Regular admin login prevents token expiry

---

**Happy blood donating! 🩸**

Need help? Check ADMIN_GUIDE.md for detailed documentation.
