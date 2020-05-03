import React, { Component } from "react";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";
class Search extends Component {
  state = {
    text: ""
  };
  //To control the input component
  onChangeHandler = event => {
    let value = event.target.value
    this.setState( {
      text: event.target.value
    } );
    this.props.searchBooks( value );
  };
  render() {
    //destructuring of variale from props of the component
    const { searchResult, shelfChanger } = this.props;
    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search book here"
              onChange={this.onChangeHandler}
              value={this.state.text}
            />
          </div>
        </div>
        {/* {conditional rendering of search result } */}
        {searchResult.length !== 0 ? (
          // calling shelf component passing the result of search
          <Shelf books={searchResult} shelfChanger={shelfChanger} />
        ) : (
            <h1 style={{ paddingTop: "100px", marginLeft: "500px" }}>Nothing To Show</h1>
          )}
      </div>
    );
  }
}

export default Search;
