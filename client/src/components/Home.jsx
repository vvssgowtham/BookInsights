import React, { useState, useEffect } from 'react';
//import '../index.css';
import "./css/home.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Add isLoading state
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        axios
            .get('https://bookstore-d1vh.onrender.com/api/books')
            .then((res) => {
                setBooks(res.data);
            })
            .catch((err) => {
                console.log('Error from ShowBookList');
            });
    }, []);

    const bookList =
        books.length === 0
            ? 'there is no book record!'
            : books.map((book, k) => <BookCard book={book} key={k} />);

    const createBook = () => {
        if (token) {
            navigate('/create-book');
        } else {
            alert("Please login to create the book!");
            navigate("/login");
        }
    }

    const handleLogout = () => {
        setIsLoading(true); // Set isLoading to true when logout is clicked
        sessionStorage.removeItem('token');
        axios
            .post('https://bookstore-d1vh.onrender.com/api/logout')
            .then((res) => {
                setIsLoading(false); // Set isLoading to false when logout response is obtained
                navigate("/");
            })
            .catch((err) => {
                console.log('Error logging out');
                setIsLoading(false); // Set isLoading to false when logout response is obtained
            });
    }

    return (
        <div className='ShowBookList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>BOOK INSIGHTS</h2>
                    </div>

                    <div className='col-md-11'>
                        <button className='check-here-btn' onClick={createBook}>Create Book</button>
                        {isLoading ? ( // Render loading screen if isLoading is true
                            <div>Loading...</div>
                        ) : (
                            token ? (
                                <button
                                    className='btn btn-outline-warning float-right'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to='/signup'
                                        className='btn btn-outline-warning float-right'
                                    >
                                        SignUp
                                    </Link>
                                    <Link
                                        to='/login'
                                        className='btn btn-outline-warning float-right'
                                    >
                                        Login
                                    </Link>
                                </>
                            )
                        )}
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>
                <div className='list'>{bookList}</div>
            </div>
        </div>
    );
}

export default Home;