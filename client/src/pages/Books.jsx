import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([]);

    // React useEffect hook
    useEffect(() => {
        // Fetch books function
        const fetchAllBooks = async () => {
            // Gets the books from the server
            try {
                const res = await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/books`);
                setBooks(res.data);
            // Handles error
            } catch(err) {
                console.log(err);
            }
        }
        // Fetching function call
        fetchAllBooks();
    }, []);

    // Delete function
    const handleDelete = async (id) => {
        try {
            // Delete action
            await axios.delete(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/books/${id}`);
            // Reload page
            window.location.reload();
        // Handles error
        } catch(err) {
            console.log(err);
        };
    };

  return (
    <div>
        <h1>Masaka Book Shop</h1>
        {/* Imports books in the DOM */}
        <div className="books">
            {/* Builds HTML for the books in the backend */}
            {books.map(book => (
                <div className="book" key={book.id}>
                    {book.cover && <img src={book.cover} alt="" />}
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>{book.price} €</span>
                    {/* Delete button */}
                    <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                    {/* Update button */}
                    <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
                </div>
            ))}
        </div>
        <button className='add_new'><Link className='add_link' to={"/add"}>Add New Book</Link></button>
    </div>
  );
};

export default Books