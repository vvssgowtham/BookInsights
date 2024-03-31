import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const submit = () => {
    navigate("/book/" + book._id);
  };
  return (
    <div className="card-container">
      <img src={book.image} alt="Books" height={200} />
      <div className="desc">
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <p>{book.description}</p>
        <button onClick={submit}>CheckHere</button>
      </div>
    </div>
  );
};

export default BookCard;
