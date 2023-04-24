import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: ""
    });

    const navigate = useNavigate();

    // handleChange function that allows to update changes
    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // handleClick function that sends the new books data to the database
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/books`, book);
            navigate("/");
        } catch(err) {
            console.log(err);
        }
    }

  return (
    // Book submission form
    <div className='form'>
        <h1>Add New Book</h1>
        <input type="text" placeholder='Title' onChange={handleChange} name="title"/>
        <input type="text" placeholder='Description' onChange={handleChange} name="desc"/>
        <input type="number" placeholder='Price' onChange={handleChange} name="price"/>
        <input type="text" placeholder='Cover' onChange={handleChange} name="cover"/>
        <button className='formButton' onClick={handleClick}>Add Book</button>
    </div>
  )
}

export default Add