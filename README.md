# Blood Donation Portal

A modern React + Node.js + MongoDB application for managing blood donations.

## Quick Start

### Prerequisites
- Node.js installed
- MongoDB Atlas account (free)

### Setup

1. **Install dependencies**
```bash
npm install
cd client && npm install && cd ..
```

2. **Configure MongoDB**
- Update `.env` with your MongoDB Atlas connection string:
```env
MONGO_URI=mongodb+srv://blood_donor:PASSWORD@cluster0.jtm8klw.mongodb.net/blood_donation?retryWrites=true&w=majority
PORT=3001
NODE_ENV=development
```

3. **Run the app**

**Terminal 1 - Backend:**
```bash
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

The app will open at `http://localhost:3000`

## Features

✅ Register as Blood Donor  
✅ Find Donors by Blood Group or City  
✅ Request Blood  
✅ View Blood Requests  
✅ Contact Form  

## Tech Stack

- **Frontend**: React 19, React Router, Axios, CSS
- **Backend**: Node.js, Express 4
- **Database**: MongoDB Atlas
- **Styling**: Modern red blood donation theme

## Project Structure

```
blood_donation_website/
├── app.js                 # Express server
├── .env                   # Environment variables
├── src/
│   ├── controllers/       # API logic
│   ├── models/           # Database schemas
│   ├── routes/           # API endpoints
│   └── scripts/          # Database utilities
├── client/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/        # React pages
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
└── package.json
```

## API Endpoints

- `POST /donors/register` - Register a donor
- `GET /donors` - Get all donors
- `GET /donors/search` - Search donors
- `POST /request/create` - Create blood request
- `GET /request/inbox` - Get all requests
- `POST /contact` - Submit contact form

## Database

**MongoDB Collections:**
1. `donors` - Blood donors
2. `bloodrequests` - Blood requests
3. `contacts` - Contact messages

## License

MIT
