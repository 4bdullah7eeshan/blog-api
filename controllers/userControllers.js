const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiry = "1h";

const signup = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { username, password: hashedPassword },
    });

    res.status(201).json({ message: "User created successfully", user });
});

const login = asyncHandler(async (req, res) => {
    const token = jwt.sign({ id: req.user.id }, jwtSecret, { expiresIn: jwtExpiry });
    res.json({ message: "Login successful", user: req.user, token });
});

const logout = asyncHandler(async (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed", error: err });
        }
        res.json({ message: "Logout successful" });
    });
});

module.exports = {
    signup,
    login,
    logout,
};
