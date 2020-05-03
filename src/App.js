import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookPage from "./components/BookPage";
import { Route, Switch } from "react-router-dom";
import Search from "./components/Search";
class BooksApp extends React.Component {
  state = {};
  getAlltToState = () => {
    BooksAPI.getAll()
      .then( books => {
        let wantToRead = [],
          read = [],
          currentlyReading = [];
        books.map( book => {
          const { shelf } = book;
          switch ( shelf ) {
            case "currentlyReading":
              currentlyReading.push( book );
              break;
            case "wantToRead":
              wantToRead.push( book );
              break;
            case "read":
              read.push( book );
              break;
            default:
              break;
          }
        } );

        this.setState( {
          currentlyReading,
          wantToRead,
          read,
          searchResult: []
        } );
      } )
      .catch( err => {
        console.log( "Error fetching data", err );
      } );
  };
  //change the shelf of the book and update the book shelf on server
  shelfChanger = ( book, event ) => {
    let prevShelf = book.shelf;
    const newShelf =
      event.target.value !== "none" ? event.target.value : "null";
    let update =
      prevShelf !== "none"
        ? this.state[prevShelf].filter( rec => rec.id !== book.id )
        : "null";

    newShelf !== "null"
      ? this.setState( state => ( {
        [prevShelf]: update,
        [newShelf]: [...state[newShelf], book]
      } ) )
      : this.setState( state => ( {
        [prevShelf]: update
      } ) );
    book.shelf = newShelf;
    BooksAPI.update( book, newShelf )
      .then()
      .catch( error => {
        alert( "data updation fail" );
      } );
  };
  findShelf = id => {
    const { wantToRead, read, currentlyReading } = this.state;
    const allBooks = [...wantToRead, ...read, ...currentlyReading];
    let filterArr = allBooks.filter( book => id === book.id );
    return filterArr.length !== 0 ? filterArr[0].shelf : "none";
  };

  searchBooks = query => {
    query &&
      BooksAPI.search( query ).then( books => {
        if ( !books.error ) {
          let searchBooks = books.map( book => {
            book.shelf = this.findShelf( book.id );
            return book;
          } );
          this.setState( {
            searchResult: searchBooks
          } );
        } else {
          this.setState( {
            searchResult: []
          } );
        }
      } );
  };
  componentDidMount() {
    this.getAlltToState();
  }

  render() {
    const { searchResult, wantToRead, currentlyReading, read } = this.state;
    return (
      <div>
        {wantToRead && (
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <BookPage
                  wantToRead={wantToRead}
                  currentlyReading={currentlyReading}
                  read={read}
                  shelfChanger={this.shelfChanger}
                />
              )}
            />
            <Route
              path="/search"
              render={() => (
                <Search
                  searchResult={searchResult}
                  searchBooks={this.searchBooks}
                  shelfChanger={this.shelfChanger}
                />
              )}
            />
          </Switch>
        )}
      </div>
    );
  }
}

export default BooksApp;
