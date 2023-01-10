const booksList = document.getElementById('books_list');
const bookForm = document.getElementById('booksForm');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Math.random();
  }

  addBook(book) {
    const newBook = new Book(book.title, book.author);
    booksArray.push(newBook);
    storeData(booksArray);
  }

  removeBook(book) {
    // console.log(booksArray);
    booksArray = booksArray.filter((e) => e.id !== book.id);
    // console.log(booksArray);
    storeData(booksArray);
  }
}

let booksArray = [];

let availableStorage;

function retrieveData() {
  const data = availableStorage.getItem('books');
  const parseData = JSON.parse(data);
  if (parseData) {
    booksArray = parseData;
  }
}

function storeData(booksArray) {
  if (availableStorage) {
    const jsonData = JSON.stringify(booksArray);
    availableStorage.setItem('books', jsonData);
  }
}

function loadBooks() {
  booksArray.forEach((book) => {
    appendBookToDOM(book);
  });
}

window.onload = () => {
  retrieveData();
  loadBooks();
};

// Check if local storage available
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

const appendBookToDOM = (book) => {
  
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
    // console.log(book);
    // book.removeBook(book);
    removeBookFromDOM(book);
  });
};

const removeBookFromDOM = (book) => {
  const removeBtn = document.getElementById(book.id);
  const bookItem = removeBtn.parentElement;
  bookItem.parentElement.removeChild(bookItem);
}

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let newBook = new Book(
    bookForm.elements.title.value,
    bookForm.elements.author.value
  );
  newBook.addBook(newBook);
  bookForm.reset();
  console.log(newBook);
  appendBookToDOM(newBook);
});
