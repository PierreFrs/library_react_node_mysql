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

// add query
app.post("/books", (req, res) => {
    // Creates the query variable
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    // Creates the values const as an array
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
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

// Delete query
app.delete('/books/:id', (req, res) => {
    // variable of the book to delete
    const bookId = req.params.id;
    // Database variable for the delete query
    const q = "DELETE FROM books WHERE id = ?";
    // Final delete query
    db.query(q, [bookId], (err, data) => {
        // Handles error
        if (err) return res.json(err);
        // Returns the response
        return res.json("Book has been deleted successfully");
    });
});

// // Old Update query (you had to update everything for it to work properly)
// app.put('/books/:id', (req, res) => {
//     // variable of the book to update
//     const bookId = req.params.id;
//     // Database variable for the update query
//     const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
//     // Specifies the values to update
//     const values = [
//         req.body.title,
//         req.body.desc,
//         req.body.price,
//         req.body.cover
//     ];
//     // Final update query
//     db.query(q, [...values, bookId], (err, data) => {
//         // Handles error
//         if (err) return res.json(err);
//         // Returns the response
//         return res.json("Book has been updated successfully");
//     });
// });

// Update query
app.put('/books/:id', (req, res) => {
    // variable of the book to update
    const bookId = req.params.id;
    // Database variable for the update query
    let q = "UPDATE books SET ";
    const values = [];

    // check if values are specified and add to query and values array
    if (req.body.title) {
        q += "`title` = ?, ";
        values.push(req.body.title);
    }
    if (req.body.desc) {
        q += "`desc` = ?, ";
        values.push(req.body.desc);
    }
    if (req.body.price) {
        q += "`price` = ?, ";
        values.push(req.body.price);
    }
    if (req.body.cover) {
        q += "`cover` = ?, ";
        values.push(req.body.cover);
    }

    // remove the last comma and space from the query
    q = q.slice(0, -2);

    // add WHERE clause and bookId value to query and values array
    q += " WHERE id = ?";
    values.push(bookId);

    // Final update query
    db.query(q, values, (err, data) => {
        // Handles error
        if (err) return res.json(err);
        // Returns the response
        return res.json("Book has been updated successfully");
    });
});

// sends the frontend to deployement
app.get("/*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "..client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    )
})

// Server listens on port
app.listen(process.env.PORT, () => {
    // Server response
    console.log('Connected to backend !'); 
});