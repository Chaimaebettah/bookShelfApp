import React from 'react'
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
        showSearchPage: false,
        searchValue: '',
    };

    formatBooks = (books) => ({
        read: books.filter(book => book.shelf === 'read'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
    });

    handleOnchange = (book) => (e) => {
        BooksAPI.update(book, e.target.value).then(books => {
            BooksAPI.getAll().then(books => {
                this.setState({...this.formatBooks(books)});
            })
        });
    };

    updateSearch = (e) => {
        this.setState({...this.state, searchValue: e.target.value});
        BooksAPI.search(this.state.searchValue.trim(), 1).then((books) => {

            if (this.state.searchValue) {
                this.setState({...this.state, searchResults: books});
            } else {
                this.setState({...this.state, searchResults: []})
            }
            if (!books) return;

        });

    };

    getBookShelf = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({...this.formatBooks(books)});
        });
    };


    renderSearchPage = () => {
        this.setState({ ...this.state, showSearchPage : true})
    };

    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <Search
                        updateSearch={this.updateSearch}
                        searchValue={this.state.searchValue}
                        handleOnchange={this.handleOnchange}
                        books={this.state.searchResults}
                        showSearchPage={this.showSearchPage}

                    />
                ) : (
                    <BookShelf
                        showSearchPage={this.state.showSearchPage}
                        getBookShelf={this.getBookShelf}
                        handleOnchange={this.handleOnchange}
                        books={{
                            read: this.state.read,
                            wantToRead: this.state.wantToRead,
                            currentlyReading: this.state.currentlyReading,
                        }}
                        renderSearchPage={this.renderSearchPage}
                    />
                )}
            </div>
        )
    }
}

export default BooksApp
