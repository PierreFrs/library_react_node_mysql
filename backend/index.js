// Imports
import express from 'express';
import mysql from "mysql2";
// Imports dotenv file
import dotenv from 'dotenv';
dotenv.config();
// Imports cors
import cors from "cors";

// Defines app variable
const app = express();

// Connects database with backend
const db = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "test",
});

// Server middleware that allows us to use any json file using a client
app.use(express.json());
// Server middleware that allows cors
app.use(cors());

// Makes sure the backend is responding
app.get("/", (req, res) => {
    res.json("Hello, this is the backend !");
});

// Selects all books query
app.get("/books", (req, res) => {
    // Creates the q variable
    const q = "SELECT * FROM books";
    // Asks the database to return the "q" query
    db.query(q, (err, data) => {
        // Handles error
        if (err) return res.json(err);
        // Returns the response
        return res.json(data);
    });
});

// Query for inserting books in the db
app.post("/books", (req, res) => {
    // Creates the query variable
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
    // Creates the values const as an array
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ];
    // Asks the database to post the values
    db.query(q, [values], (err, data) => {
        // Handles error
        if (err) return res.json(err);
        // Returns the response
        return res.json("Book has been created successfully");
    });
});

// Server listens on port
app.listen(process.env.PORT, () => {
    // Server response
    console.log('Connected to backend !'); 
});