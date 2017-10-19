import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';



class BookShelf extends Component {

    componentDidMount() {
        this.props.getBookShelf();
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.props.books.read.map((book) => {
                                        return <Book handleOnchange={this.props.handleOnchange(book)}
                                                            book={book} key={book.id}/>
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.props.books.currentlyReading.map((book) => {
                                        return <Book handleOnchange={this.props.handleOnchange(book)}
                                                            book={book} key={book.id}/>
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.props.books.wantToRead.map((book) => {
                                        return <Book handleOnchange={this.props.handleOnchange(book)}
                                                            book={book} key={book.id}/>
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link  to="/search" onClick={() => this.props.renderSearchPage()}>Add a book</Link>
                </div>
            </div>
        )
    }
}



export default BookShelf;
