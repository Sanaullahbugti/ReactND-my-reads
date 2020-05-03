import React from "react";
import { Link } from "react-router-dom";
export default function Shelf(props) {
  const { shelfChanger, shelf, books } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks?book.imageLinks.thumbnail:require("../images/noimage.png")})`
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      id={book.id}
                      value={book.shelf}
                      onChange={event => shelfChanger(book, event)}
                    >
                      <option value="move" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                  {book.authors && `${book.authors.join(", ")}`}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button />
        </Link>
      </div>
    </div>
  );
}
