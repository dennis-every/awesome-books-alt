const booksList = document.getElementById('books_list');
const bookForm = document.getElementById('booksForm');

function Book(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

const booksArray = [
  {
    title: 'Lord of the Rings',
    author: 'Tolkein',
    id: '0',
  },
  {
    title: 'Harry Potter',
    author: 'Author',
    id: '1',
  },
];

const appendBook = (title, author, id) => {
  const bookItem = document.createElement('li');
  bookItem.innerHTML = `
    <h2>${title}</h2>
    <h2>${author}</h2>
    <button type="button" id=${id}>Remove</button>`;
  booksList.append(bookItem);
};

function loadBooks() {
  booksArray.forEach((book) => {
    appendBook(book.title, book.author, book.id);
  });
}

window.onload = (event) => {
  loadBooks();
};

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const book = new Book(
    bookForm.elements['title'].value,
    bookForm.elements['author'].value,
    Math.random()
  );
  booksArray.push(book);
  appendBook(book.title, book.author, book.id);
  bookForm.reset();
});
