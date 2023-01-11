const booksList = document.getElementById('books_list');
const bookForm = document.getElementById('booksForm');
let books = [];

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  getBooks() {
    if (availableStorage.getItem('books')) {
      const booksData = availableStorage.getItem('books');
      books = JSON.parse(booksData);
    }
    return books;
  }

  addBook(book) {
    const retrievedBooks = this.getBooks();
    const newBook = new Book(book.title, book.author, new Date().valueOf());
    const updatedBooks = retrievedBooks.concat(newBook);
    this.storeBooks(updatedBooks);
    this.showBook(newBook);
  }

  storeBooks(books) {
    if (availableStorage) {
      availableStorage.removeItem('books');
      const jsonData = JSON.stringify(books);
      availableStorage.setItem('books', jsonData);
    }
  }

  removeBook(book) {
    const retrievedBooks = this.getBooks();
    const updatedBooks = retrievedBooks.filter((e) => e.id !== book.id);
    this.storeBooks(updatedBooks);
  }

  loadBooks() {
    if (books) {
      books.forEach((book) => {
        this.showBook(book);
      });
    }
  }

  showBook(book) {
    const bookItem = document.createElement('li');
    const removeButton = document.createElement('button');
    const hr = document.createElement('hr');
    bookItem.setAttribute('style', 'max-width: 300px;');
    removeButton.innerText = 'Remove';
    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('id', book.id);
    bookItem.innerHTML = `
      <span>${book.title}</span> <br>  
      <span>${book.author}</span> <br>
      `;
    bookItem.append(removeButton);
    bookItem.append(hr);
    booksList.append(bookItem);
    removeButton.addEventListener('click', () => {
      this.removeBook(book);
      booksList.removeChild(bookItem);
    });
  }
}

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = bookForm.elements.title.value;
  const author = bookForm.elements.author.value;
  const newBook = new Book(title, author);
  newBook.addBook(newBook);
  bookForm.reset();
});

window.onload = () => {
  const newBookObj = new Book();
  newBookObj.getBooks();
  newBookObj.loadBooks();
};

// Check if local storage available

let availableStorage;

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      storage &&
      storage.length !== 0
    );
  }
}

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  availableStorage = window.localStorage;
} else {
  // Too bad, no localStorage for us
  availableStorage = null;
}
