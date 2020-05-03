import React from "react";
import Shelf from "./Shelf";
export default function BookPage(props) {
  return (
    <div>
      <div className="list-books-title">
        <h1>My Reads</h1>
      </div>
      <Shelf
        shelf="Want To Read"
        books={props.wantToRead}
        shelfChanger={props.shelfChanger}
      />
      <Shelf
        shelf="Currently Reading"
        books={props.currentlyReading}
        shelfChanger={props.shelfChanger}
      />
      <Shelf
        shelf="Read"
        books={props.read}
        shelfChanger={props.shelfChanger}
      />
    </div>
  );
}
