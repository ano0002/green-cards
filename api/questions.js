import { Router } from "express";
import jwt from "jsonwebtoken";
import makeRequest from "./db.js";

const questionsRouter = Router();

questionsRouter.get("/today", async (req, res) => {
    try {
        const rows = await makeRequest("SELECT sentence FROM questions");
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

questionsRouter.post("/today", async (req, res) => {
    try {
        const { answer, token } = req.body;
        
        if (!answer) {
            return res.status(400).json({ message: "Answer is required" });
        }
        const rows = await makeRequest("SELECT expected_answer FROM questions");
        if (rows.length === 0) {
            return res.status(404).json({ message: "No questions found" });
        }
        //Pick the today's random question from the list using today's date as a seed
        const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
        const randomIndex = parseInt(today.slice(-2)) % rows.length;
        const question = rows[randomIndex];
        const expectedAnswer = question.expected_answer;
        if (answer.toLowerCase() === expectedAnswer.toLowerCase()) {
            if (token) {
                jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                    if (err) {
                        return res.status(401).json({ message: "Invalid token" });
                    }
                    const username = decoded.username;
                    
                    //Get last card added to the owned_cards table

                    const lastCard = await makeRequest("SELECT created_at FROM owned_cards WHERE username = ? ORDER BY created_at DESC LIMIT 1", [username])

                    if (lastCard.length > 0) {
                        const lastCardDate = new Date(lastCard[0].created_at);
                        const todayDate = new Date();
                        // Check if the last card was added today
                        if (lastCardDate.toDateString() === todayDate.toDateString()) {
                            return res.status(200).json({ message: "Correct Answer but you already obtained a card today" });
                        }
                    }

                    //Get unowned cards from the database
                    const cards = await makeRequest("SELECT id,name FROM cards WHERE id NOT IN (SELECT id FROM owned_cards WHERE username = ?)", [username])
                    
                    if (cards.length === 0) {
                        return res.status(200).json({ message: "Correct Answer but you own all the cards already" });
                    }
                    // Pick a random card from the unowned cards
                    const rndCardIndex = Math.floor(Math.random() * cards.length);
                    const rndCardId = cards[rndCardIndex].id;
                    const rndCardName = cards[rndCardIndex].name;
                    
                    // Add the card to the user's owned cards
                    makeRequest("INSERT INTO owned_cards (username, id) VALUES (?, ?)", [username, rndCardId]);
                    res.status(200).json({ message: "Correct answer, you obtained "+ rndCardName});
                });
            } else {
                res.status(200).json({ message: "Correct answer" });
            }
        } else {
            res.status(400).json({ message: "Incorrect answer", expectedAnswer });
        }
    } catch (error) {
        console.error("Error checking answer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default questionsRouter;