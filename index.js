const booksList = document.getElementById('books_list');

function Book(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
}

const booksArray = [
    {
        title: "Lord of the Rings",
        author: "Tolkein",
        id: "0"
    },
    {
        title: "Harry Potter",
        author: "Author",
        id: "1"
    }
];


function loadBooks() {
    booksArray.forEach((book) => {
        const bookItem = document.createElement('li');
        bookItem.innerHTML = `<h2>${book.title}</h2>
                              <h2>${book.author}</h2>
                              <button type="button" id=${book.id}>Remove</button>`
        booksList.append(bookItem);
    })
};


window.onload = (event) => {
    loadBooks();
};


