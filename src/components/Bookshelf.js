import React from "react";
import Book from "./Book";
const Bookshelf = ({ title, bookArr, onChangeShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookArr.map((item, idx) => (
            <li key={`${idx}-${item.title}`}>
              <Book book={item} onChange={onChangeShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default Bookshelf;
