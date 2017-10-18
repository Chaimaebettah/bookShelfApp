import React, { Component } from 'react'
import Book from './Book';



class Search extends Component {
    render() {
       // console.log(this.props.searchValue);
       // console.log(this.props.books);
       //  if (this.props.searchValue) {
       //
       //  }
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.props.showSearchPage}>Close</a>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.props.searchValue} onChange={this.props.updateSearch}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.books.map((book) =>
                            <Book book={book} handleOnchange={this.props.handleOnchange(book)} />
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;