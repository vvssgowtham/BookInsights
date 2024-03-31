import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/home.css"

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const submit = () => {
    navigate("/book/" + book._id);
  };
  return (
    <div className="card-container">
      <img src={book.image} alt="Books" height={200} style={{borderRadius:"10px"}}/>
      <div className="desc">
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <p>{book.description}</p>
        <button className="check-here-btn" onClick={submit}>CheckHere</button>
        <br />
        <hr />
      </div>
    </div>
  );
};

export default BookCard;
