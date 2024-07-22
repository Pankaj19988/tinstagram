const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Creating user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json(user);
    } catch (error) {
        // Handle Sequelize validation errors or other issues
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Email already in use' });
        }
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token,...user.toSafeJSON() });
});

// Check user login
// router.get('/me',auth,async (req, res) => {
//     res.status(200).json({ message: 'Authorized' });
// })

module.exports = router;
