import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Book from './Book';


class Search extends Component {

    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.props.searchValue} onChange={this.props.updateSearch}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.books.map((book) =>
                            <Book book={book} key={book.id} value={book.shelf} handleOnchange={this.props.handleOnchange(book)} />
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;