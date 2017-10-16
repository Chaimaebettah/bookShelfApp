import React from 'react'
import RenderBooks from './RenderBooks';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  formatBooks (books) {
    return {
      read: books.filter(book => book.shelf === 'read'),
      wantToRead: books.filter(book => book.shelf === 'wantToRead'),
      currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
    }
  }

  componentDidMount() {
      BooksAPI.getAll().then((books)=> {
        const formattedBooks = this.formatBooks(books);
        this.setState({
            books: {
                read: formattedBooks.read,
                wantToRead: formattedBooks.wantToRead,
                currentlyReading: formattedBooks.currentlyReading,
            }
        });
      });
  }

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books : {
      read: [],
      wantToRead: [],
      currentlyReading: [],
    },
    showSearchPage: false
  };
  render() {
      // handleOnchange(e){
      //   console.log(e);
      // }

      return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
                            {this.state.books.read.map((book)=>(
                                <RenderBooks book={book} key={book.id}/>
                            ))}
                        </ol>
                    </div>
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.state.books.wantToRead.map((book)=>(
                                <RenderBooks book={book} key={book.id}/>
                            ))}
                        </ol>
                    </div>
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.state.books.currentlyReading.map((book)=>(
                                <RenderBooks book={book} key={book.id}/>
                            ))}
                        </ol>
                    </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
