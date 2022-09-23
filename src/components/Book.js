import React from "react";
import Select from "./Select";
import { useState } from "react";
import * as BookAPI from "../BooksAPI";
function Book({ book, onChange }) {
  // const [select, setSelect] = useState("wantToRead");
  const [select, setSelect] = useState("");
  //when selecting a choice

  function handleChange(newSelect) {
    //1-current shelf
    //2-book details ? book
    //3-new shelf [/]
    setSelect(newSelect); // Child |==>

    BookAPI.update(book, newSelect);

    onChange(); // Parent <==|
  }

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <Select value={book.shelf} onChange={handleChange} />
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
}

export default Book;
