import { Router } from "express";
import db from "./db.js";

const questionsRouter = Router();

questionsRouter.get("/today", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT sentence FROM questions");
        if (rows.length === 0) {
            return res.status(404).json({ error: "No questions found" });
        }
        //Pick a random question from the list using today's date as a seed
        const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
        const randomIndex = parseInt(today.slice(-2)) % rows.length;
        const question = rows[randomIndex];
        res.status(200).json({ message: "Question fetched successfully", data: question });
    }
    catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default questionsRouter;