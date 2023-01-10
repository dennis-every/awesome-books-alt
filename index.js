const booksList = document.getElementById('books_list');
const bookForm = document.getElementById('booksForm');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Math.random();
  }

  addBook(title, author) {
    const book = new Book(title, author);
    booksArray.push(book);
    storeData(booksArray);
  }
}

let booksArray = [];

let availableStorage;

// function displayData() {
//   // booksList.innerHTML = '';
//   booksArray.forEach((book) => {
//     const bookItem = document.createElement('li');
//     const removeButton = document.createElement('button');
//     const hr = document.createElement('hr');
//     bookItem.setAttribute('style', 'max-width: 300px;');
//     removeButton.innerText = 'Remove';
//     removeButton.setAttribute('type', 'button');
//     removeButton.setAttribute('id', book.id);
//     bookItem.innerHTML = `
//       <span>${book.title}</span> <br>
//       <span>${book.author}</span> <br>
//       `;
//     bookItem.append(removeButton);
//     bookItem.append(hr);
//     booksList.append(bookItem);
//     removeButton.addEventListener('click', () => {
//       removeBookHandler(book.id);
//     });
//   });
// }

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

function removeBookHandler(id) {
  booksArray = booksArray.filter((e) => e.id !== id);
  storeData(booksArray);
  const removeBtn = document.getElementById(id);
  const bookItem = removeBtn.parentElement;
  bookItem.parentElement.removeChild(bookItem);
}

function loadBooks() {
  booksArray.forEach((book) => {
    appendBookToDOM(book.title, book.author, book.id);
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

const appendBookToDOM = (title, author, id) => {
  const bookItem = document.createElement('li');
  const removeButton = document.createElement('button');
  const hr = document.createElement('hr');
  bookItem.setAttribute('style', 'max-width: 300px;');
  removeButton.innerText = 'Remove';
  removeButton.setAttribute('type', 'button');
  removeButton.setAttribute('id', id);
  bookItem.innerHTML = `
    <span>${title}</span> <br>  
    <span>${author}</span> <br>
    `;
  bookItem.append(removeButton);
  bookItem.append(hr);
  booksList.append(bookItem);
  removeButton.addEventListener('click', () => {
    removeBookHandler(id);
  });
};

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let newBook = new Book(
    bookForm.elements.title.value,
    bookForm.elements.author.value
  );
  newBook.addBook(newBook.title, newBook.author);
  bookForm.reset();
  appendBookToDOM(newBook.title, newBook.author, newBook.id);
});
