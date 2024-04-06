import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./css/book.css";



const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");


    const deleteBook = async () => {
        if(token){
            const response = await axios.delete(`https://bookstore-vvssgowtham.onrender.com/api/books/${id}`, {
                headers: {
                    "x-token": token,
                },
            });
            alert(response.data.message);
            navigate("/");
        }else{
            alert("Please login to delete the book!");
            navigate("/login")
        }
    }

    const editBook = async () => {
        if(token){
            navigate(`/update-book/${id}`);
        }else{
            alert("Please login to edit the book!");
            navigate("/login")
        }
    }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://bookstore-vvssgowtham.onrender.com/api/books/${id}`);
      setBook(response.data);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <center>
        <h1><a href="/">Book Details</a></h1>
      </center>
      <hr />
      <br />
      <table>
        <tbody>
          {book && (
            <>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>Title</th>
                <td style={{ border: "1px solid black" }}>{book.title}</td>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>Image</th>
                <td style={{ border: "1px solid black" }}>
                  <img src={book.image} alt="Books" height={200} />
                </td>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>ISBN</th>
                <td style={{ border: "1px solid black" }}>{book.isbn}</td>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>Author</th>
                <td style={{ border: "1px solid black" }}>{book.author}</td>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>Description</th>
                <td style={{ border: "1px solid black" }}>
                  {book.description}
                </td>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>Published Date</th>
                <td style={{ border: "1px solid black" }}>
                  {book.published_date}
                </td>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>Publisher</th>
                <td style={{ border: "1px solid black" }}>{book.publisher}</td>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black" }}>Updated Date</th>
                <td style={{ border: "1px solid black" }}>
                  {book.updated_date}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <button
          style={{
            padding: "10px",
            backgroundColor: "red",
            color: "white",
            fontFamily: "sans-serif",
            cursor: "pointer",
          }}
          onClick={deleteBook}
        >
          Delete Book
        </button>
        <button
          style={{
            padding: "10px",
            backgroundColor: "green",
            color: "white",
            marginLeft: "10px",
            fontFamily: "sans-serif",
            cursor: "pointer",
          }}
          onClick={editBook}
        >
          Edit Book
        </button>
      </div>
    </>
  );
};

export default Book;
