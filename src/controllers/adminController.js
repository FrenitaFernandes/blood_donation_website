const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blood_donation_secret_key_2026';

// Register admin (should only be done once or by super admin)
exports.registerAdmin = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this username or email already exists' });
        }

        const admin = await Admin.create({
            username,
            email,
            password,
            role: role || 'Admin',
        });

        res.status(201).json({ message: 'Admin registered successfully!', admin: { id: admin._id, username: admin.username } });
    } catch (err) {
        console.error('Error registering admin:', err.message);
        res.status(500).json({ message: 'Error registering admin' });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful!',
            token,
            admin: { id: admin._id, username: admin.username, role: admin.role, email: admin.email }
        });
    } catch (err) {
        console.error('Error logging in:', err.message);
        res.status(500).json({ message: 'Error logging in' });
    }
};

// Verify token
exports.verifyToken = (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ valid: true, admin: decoded });
    } catch (err) {
        res.status(401).json({ valid: false, message: 'Invalid or expired token' });
    }
};

// Get all admins (super admin only)
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}).select('-password').sort({ createdAt: -1 });
        res.json(admins);
    } catch (err) {
        console.error('Error fetching admins:', err.message);
        res.status(500).json({ message: 'Error fetching admins' });
    }
};
