import React from 'react'
import { Route } from 'react-router-dom';
import Search from './Search'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        books: [],
        searchResults: [],
        read: [],
        wantToRead: [],
        currentlyReading: [],
        searchValue: '',
    };

    formatBooks = (books) => ({
        read: books.filter(book => book.shelf === 'read'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
    });

    handleOnchange = (book) => (e) => {
        BooksAPI.update(book, e.target.value).then(() => {
            BooksAPI.getAll().then(books => {
                this.setState({...this.state, books: books, ...this.formatBooks(books)});

            })
        });
    };

    updateSearch = (e) => {

        this.setState({...this.state, searchValue: e.target.value});

        BooksAPI.search(e.target.value.trim(), 1).then((response) => {

            if (!response || response.error || this.state.searchValue.length < 1) {
                this.setState({...this.state, searchResults: []});
                return;
            }
            const searchBooks = response.slice(0);

            this.state.books.forEach(shelfBook => {
                searchBooks.forEach(searchBook => {
                    if (!searchBook.shelf) {
                        searchBook.shelf = 'none';
                    }

                    if (shelfBook.id === searchBook.id) {
                        searchBook.shelf = shelfBook.shelf;
                    }
                })
            });

            this.setState({...this.state, searchResults: searchBooks});
        })
            .catch(console.error);
    };

    getBookShelf = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books,
                ...this.formatBooks(books)});
        });
    };

    componentDidMount() {
        this.getBookShelf();
    }

    render() {
        return (
            <div className="app">
                <Route path="/" exact render={() => (
                    <BookShelf
                        showSearchPage={this.state.showSearchPage}
                        getBookShelf={this.getBookShelf}
                        handleOnchange={this.handleOnchange}
                        books={{
                            read: this.state.read,
                            wantToRead: this.state.wantToRead,
                            currentlyReading: this.state.currentlyReading,
                        }}
                    />
                )}
                />
                <Route path="/search" exact render={() => (
                    <Search
                        updateSearch={this.updateSearch}
                        searchValue={this.state.searchValue}
                        handleOnchange={this.handleOnchange}
                        books={this.state.searchResults}

                    />
                )}
                />
            </div>
        )
    }
}


export default BooksApp
