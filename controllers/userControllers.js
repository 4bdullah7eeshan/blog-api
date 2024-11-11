const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const signup = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { username, password: hashedPassword },
    });

    res.status(201).json({ message: "User created successfully", user });
});

const login = asyncHandler(async (req, res) => {
    res.json({ message: "Login successful", user: req.user });
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
