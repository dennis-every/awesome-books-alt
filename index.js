const booksList = document.getElementById('books_list');
const bookForm = document.getElementById('booksForm');

function Book(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

let booksArray = [];

// let availableStorage;

function retrieveData() {
  const data = availableStorage.getItem('books');
  const parseData = JSON.parse(data);
  if (parseData?.length > 0) {
    parseData.forEach((book) => {
      booksArray.push(book);
    });
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

const appendBook = (title, author, id) => {
  const bookItem = document.createElement('li');
  const removeButton = document.createElement('button');
  const hr = document.createElement('hr');
  bookItem.setAttribute('style', 'max-width: 300px;');
  // hr.setAttribute('style', '');
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

function loadBooks() {
  booksArray.forEach((book) => {
    appendBook(book.title, book.author, book.id);
  });
}

window.onload = () => {
  retrieveData();
  loadBooks();
};

// Check if local storage available
// function storageAvailable(type) {
//   let storage;
//   try {
//     storage = window[type];
//     const x = '__storage_test__';
//     storage.setItem(x, x);
//     storage.removeItem(x);
//     return true;
//   } catch (e) {
//     return (
//       e instanceof DOMException &&
//       // everything except Firefox
//       (e.code === 22 ||
//         // Firefox
//         e.code === 1014 ||
//         // test name field too, because code might not be present
//         // everything except Firefox
//         e.name === 'QuotaExceededError' ||
//         // Firefox
//         e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
//       // acknowledge QuotaExceededError only if there's something already stored
//       storage &&
//       storage.length !== 0
//     );
//   }
// }

// if (storageAvailable('localStorage')) {
//   // Yippee! We can use localStorage awesomeness
//   availableStorage = window.localStorage;
// } else {
//   // Too bad, no localStorage for us
//   availableStorage = null;
// }

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const book = new Book(
    bookForm.elements.title.value,
    bookForm.elements.author.value,
    Math.random(),
  );
  booksArray.push(book);
  appendBook(book.title, book.author, book.id);
  storeData(booksArray);
  bookForm.reset();
});
