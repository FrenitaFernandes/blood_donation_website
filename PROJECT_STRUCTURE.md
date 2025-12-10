# Blood Donation Website - Project Structure

```
blood_donation_website/
├── app.js                      # Main application entry point
├── package.json               # Dependencies and scripts
├── .env                       # Environment variables (local config)
├── .env.example              # Example environment configuration
├── .gitignore                # Git ignore patterns
├── database_setup.sql        # Initial database setup script
│
├── public/                   # Static assets
│   ├── css/
│   │   └── style.css        # Application styles
│   └── js/
│       └── script.js        # Client-side JavaScript
│
├── src/                     # Source code
│   ├── config/
│   │   └── database.js      # Database configuration manager
│   │
│   ├── controllers/         # Business logic layer
│   │   ├── donorController.js    # Donor-related operations
│   │   ├── miscController.js     # Miscellaneous operations
│   │   └── requestController.js  # Blood request operations
│   │
│   ├── models/             # Data access layer
│   │   └── db.js           # Database connection and pool
│   │
│   ├── routes/             # API endpoints
│   │   ├── donorRoutes.js      # Donor-related routes
│   │   ├── miscRoutes.js       # Miscellaneous routes
│   │   └── requestRoutes.js    # Blood request routes
│   │
│   └── scripts/            # Utility scripts
│       ├── setup-database.js   # Database initialization
│       └── seed-database.js    # Sample data insertion
│
└── views/                  # Frontend templates (EJS)
    ├── about.ejs          # About page
    ├── contact.ejs        # Contact page
    ├── donors.ejs         # Donor listing page
    ├── find.ejs           # Find donors page
    ├── home.ejs           # Homepage
    ├── inbox.ejs          # Blood requests inbox
    ├── register.ejs       # Donor registration
    ├── request.ejs        # Blood request form
    ├── requests.ejs       # Blood requests listing
    └── partials/          # Reusable components
        ├── header.ejs     # Common header
        └── footer.ejs     # Common footer
```