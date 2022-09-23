import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Bookshelf from "./components/Bookshelf";
import Book from "./components/Book";
import * as BookAPI from "./BooksAPI";

/**
 * #When?
 * - when selecting a shelf
 *
 * #How?
 * MoveBook
 * 1- take book from one shelf (delete)
 * 2- move it to another shelf (append/push)
 * ---------------------
 * variables:
 * - book (?)
 * - current shelf
 * - new shelf
 * --------------------
 * code:
 * 1- read variables [/]
 * 1- push in the new shelf
 *
 *
 * --------------------
 * setup
 *   const changeShelf = () => {};
 */

function App() {
  const [bookshelf, setbookshelf] = useState([]);
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [shelfArr, setshelfArr] = useState([]);
  const [searchArr, setSearchArr] = useState([]);

  const [fetch, setFetch] = useState(true);

  const changeShelf = () => {
    setFetch(true);
  };

  function handleChange(e) {
    const inputValue = e.target.value;
    BookAPI.search(inputValue, 50).then((books) => {
      console.log(books)
      setSearchArr(books);
    });
  }

  // useEffect
  useEffect(() => {
    /**
     * if fetch is required
     */
    // run something in the lifecycle
    if (fetch) {
      BookAPI.getAll().then((books) => {
        // books
        // inside this => access books
        setbookshelf(books);
        // console.log(books[0].shelf);
        bookArrRefactor(books);
        setFetch(false);
      });
    }
  }, [fetch]);

  const bookArrRefactor = (booksArray) => {
    const array1 = [];
    const array2 = [];
    const array3 = [];

    booksArray.forEach(dist);
    function dist(item) {
      const shelf = item.shelf;
      // console.log(shelf);
      if (shelf === "currentlyReading") {
        array1.push(item);
      } else if (shelf === "wantToRead") {
        array2.push(item);
      } else {
        array3.push(item);
      }
    }
    const newShelfArr = [
      { title: "Currently Reading", array: array1 },
      { title: "Want to Read", array: array2 },
      { title: "Read", array: array3 },
    ];
    setshelfArr(newShelfArr);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {searchArr.map((item, idx) => {
                return (
                  <li key={`${idx}-${item.title}`}>
              <Book book={item} onChange={changeShelf} />
            </li>
                );
              })}
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Header title="My Reads" />
          <div className="list-books-content">
            {shelfArr.length > 0 &&
              shelfArr.map((item, idx) => (
                <div key={`${idx}-${item.title}`}>
                  <Bookshelf
                    title={item.title}
                    bookArr={item.array}
                    onChangeShelf={changeShelf}
                  />
                </div>
              ))}
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
