const booksList = document.getElementById('books_list');
const bookForm = document.getElementById('booksForm');

function Book(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

let booksArray = [
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

function removeBookHandler(id) {
  console.log(booksArray);
  booksArray = booksArray.filter((e) => e.id !== id);
  console.log(booksArray);
}

const appendBook = (title, author, id) => {
  const bookItem = document.createElement('li');
  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.setAttribute('type', 'button');
  removeButton.setAttribute('id', id);
  bookItem.innerHTML = `
    <h2>${title}</h2>
    <h2>${author}</h2>`;
  bookItem.append(removeButton);
  booksList.append(bookItem);
  removeButton.addEventListener('click', (event) => {
    removeBookHandler(id);
  });
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

const removeButtons = document.querySelectorAll("button");
removeButtons.forEach((remButton) => {
  remButton.addEventListener('click', (event) => {
    
  })
})



