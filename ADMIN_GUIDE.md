# Blood Donation Portal - Admin & Donor Features Guide

## New Features Added

### 1. Admin User System
- Login-based authentication system
- JWT token-based session management
- Admin dashboard for managing blood requests and donors

### 2. Blood Request Status Management
- Requests can be marked as: **Pending**, **Fulfilled**, or **Cancelled**
- Admin can update, delete, or filter requests by status
- Track the lifecycle of each blood request

### 3. Donor Availability Toggle
- Donors can toggle their availability status
- Unavailable donors appear grayed out in the Find Donors page
- Admin can manage donor availability from the dashboard
- Donors can delete their profile

---

## Setup Instructions

### Backend Setup

#### 1. Install Dependencies
```bash
cd c:\xampp\htdocs\blood_donation_website
npm install bcryptjs jsonwebtoken
```

#### 2. Create Default Admin Account
```bash
node src/scripts/setup-admin.js
```

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`
- Email: `admin@blooddonation.com`
- Role: `SuperAdmin`

#### 3. Start Backend Server
```bash
npm start
# OR for development with auto-reload
npm run dev
```

The API will run on `http://localhost:3001`

### Frontend Setup

#### 1. Navigate to client directory
```bash
cd client
```

#### 2. Start React app
```bash
npm start
```

The frontend will run on `http://localhost:3000`

---

## How to Use

### Admin Login & Dashboard

1. **Access Admin Panel**
   - Click "Admin" link in the navigation bar
   - Or navigate to `http://localhost:3000/admin/login`

2. **Login with Default Credentials**
   - Username: `admin`
   - Password: `admin123`

3. **Admin Dashboard Features**
   - **Blood Requests Tab**: Manage all blood requests
   - **Manage Donors Tab**: View and manage all donor profiles

### Managing Blood Requests

#### View Requests
- Click "Blood Requests" tab in admin dashboard
- All requests are displayed with status indicators

#### Filter by Status
- Use filter buttons to view: All, Pending, Fulfilled, Cancelled
- Requests show patient details, location, urgency, and contact info

#### Update Request Status
- **Mark as Fulfilled**: When blood is successfully provided
- **Cancel**: If request is no longer needed
- **Delete**: Permanently remove a request from the system

### Managing Donors

#### View All Donors
- Click "Manage Donors" tab in admin dashboard
- All registered donors are listed (available and unavailable)

#### Toggle Donor Availability
- Use the switch toggle for each donor
- Available (✅) - Donor can receive contact for donation
- Unavailable (⏸) - Donor temporarily paused (can reactivate later)

#### Delete Donor Profile
- Click "Delete Profile" button to permanently remove a donor
- This action cannot be undone

### Donor Self-Management

#### View Donor Status
- Go to "Find Donors" page
- Your donor profile shows with availability toggle

#### Toggle Your Availability
- Use the switch next to your name
- ON (✅): You're available to donate
- OFF (⏸): You're temporarily unavailable
- Unavailable donors appear grayed out

#### Delete Your Profile
- Contact admin to delete your profile permanently

---

## Database Models

### Admin Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed with bcryptjs),
  role: String ('Admin' or 'SuperAdmin'),
  createdAt: Date,
  updatedAt: Date
}
```

### Updated BloodRequest Model
```javascript
{
  patient_name: String,
  required_blood_group: String,
  location: String,
  hospital_name: String,
  blood_units: Number,
  urgency: String,
  contact_phone: String,
  contact_email: String,
  status: String ('Pending', 'Fulfilled', 'Cancelled'),  // NEW FIELD
  createdAt: Date,
  updatedAt: Date
}
```

### Updated Donor Model
```javascript
{
  name: String,
  age: Number,
  gender: String,
  blood_group: String,
  contact_phone: String,
  contact_email: String,
  city: String,
  is_available: Boolean,  // Already existed, now fully utilized
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints

### Admin Endpoints
```
POST   /admin/register        - Register new admin
POST   /admin/login           - Login admin
GET    /admin/verify          - Verify JWT token
GET    /admin/all             - Get all admins
```

### Blood Request Endpoints
```
GET    /request/inbox         - Get all requests
GET    /request/status?status=Pending  - Filter by status
POST   /request/create        - Create new request
PUT    /request/:id/status    - Update request status
DELETE /request/:id           - Delete request
```

### Donor Endpoints
```
GET    /donors                - Get available donors
GET    /donors/admin/all      - Get all donors (for admin)
POST   /donors/register       - Register new donor
GET    /donors/search         - Search donors by blood group/city
PUT    /donors/:id/availability  - Update donor availability
DELETE /donors/:id            - Delete donor profile
```

---

## File Structure

### Backend
```
src/
├── models/
│   ├── Admin.js                      (NEW)
│   ├── BloodRequest.js               (UPDATED)
│   ├── Donor.js                      (UPDATED)
│   └── ...
├── controllers/
│   ├── adminController.js            (NEW)
│   ├── requestController.js          (UPDATED)
│   ├── donorController.js            (UPDATED)
│   └── ...
├── routes/
│   ├── adminRoutes.js                (NEW)
│   ├── requestRoutes.js              (UPDATED)
│   ├── donorRoutes.js                (UPDATED)
│   └── ...
└── scripts/
    └── setup-admin.js                (NEW)
```

### Frontend
```
client/src/
├── pages/
│   ├── AdminLogin.js                 (NEW)
│   ├── AdminDashboard.js             (NEW)
│   ├── FindDonors.js                 (UPDATED)
│   └── ...
├── context/
│   └── AdminContext.js               (NEW)
├── styles/
│   ├── AdminLogin.css                (NEW)
│   ├── AdminDashboard.css            (NEW)
│   └── ...
└── App.js                            (UPDATED)
```

---

## Security Notes

- Passwords are hashed using bcryptjs before storing in database
- JWT tokens expire after 24 hours
- Tokens are stored in localStorage on the client
- All sensitive operations require authentication
- Consider adding rate limiting and input validation in production

---

## Troubleshooting

### Admin Login Not Working
1. Ensure backend server is running on port 3001
2. Check if default admin was created: `node src/scripts/setup-admin.js`
3. Verify MongoDB connection in terminal

### Donor Availability Toggle Not Working
1. Ensure you're searching/viewing donors first
2. Check browser console for API errors
3. Verify the donor has a valid ID

### CSS Not Loading for Admin Pages
- Clear browser cache (Ctrl+F5)
- Check if CSS files are in `client/src/styles/` directory

### Blood Request Status Not Updating
1. Verify you're logged in as admin
2. Check if JWT token is valid
3. Monitor MongoDB for any constraint violations

---

## Future Enhancements

- Email notifications when request status changes
- SMS alerts for critical blood requests
- Donor ranking based on donations
- Blood inventory management
- Request location mapping
- Admin analytics dashboard
- Two-factor authentication for admin
- Audit logs for all admin actions

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review error messages in browser console
3. Check backend server logs
4. Verify MongoDB connection

Happy blood donating! 🩸
