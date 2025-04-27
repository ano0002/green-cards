import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "./db.js";

const usersRouter = Router();

// GET /api/users
usersRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        const users = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
        if (users[0].length === 0) {
            return res.status(401).json({ error: "Invalid username" });
        }
        const user = users[0][0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful", data: { token: jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: "1h" }) } });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

usersRouter.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        const existingUsers = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUsers[0].length > 0) {
            return res.status(409).json({ error: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

usersRouter.get("/", async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(401).json({ error: "Token is required" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            }
            const username = decoded.username;
            db.execute("SELECT cards.* FROM owned_cards JOIN cards ON owned_cards.id = cards.id WHERE owned_cards.username = ?", [username])
                .then(cards => {
                    res.status(200).json({ message: "User fetched successfully", data: {
                        username: username,
                        cards: cards[0].map(card => ({
                            id: card.id,
                            name: card.name,
                            rarity: card.rarity,
                            image: card.image
                        }))
                    } });
                })
                .catch(error => {
                    console.error("Error fetching user:", error);
                    res.status(500).json({ error: "Internal server error" });
                });
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default usersRouter;