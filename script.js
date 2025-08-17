// Library array to store all book objects
const myLibrary = [];

// Book constructor function
function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
};

// Function to add books to library
function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    return newBook;
}

// Function to display all books
function displayBooks() {
    const booksContainer = document.querySelector('.libraryDock');
    booksContainer.innerHTML = '';

    if (myLibrary.length === 0) {
        booksContainer.innerHTML = '<p class="emptyMessage">No Books in the Library. Add book to the library using the form and submit Button</p>';
        return;
    }

    myLibrary.forEach(function(book) {
        const bookCard = document.createElement('div');
        bookCard.className = 'bookCard';
        bookCard.dataset.id = book.id;
        
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p class="status"><strong>Status:</strong> ${book.isRead ? 'Read' : 'Not Read Yet'}</p>
            <div class="bookActions">
                <button class="toggleReadBtn">${book.isRead ? 'Mark Unread' : 'Mark Read'}</button>
                <button class="removeBtn">Remove</button>
            </div>
        `;
        
        booksContainer.appendChild(bookCard);
    });
}

// Function to handle form submission
function setupFormHandlers() {
    const form = document.getElementById('addBookForm'); // Matches your HTML form ID

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const isRead = document.querySelector('input[name="status"]:checked').value === 'Read';

        addBookToLibrary(title, author, pages, isRead);
        displayBooks();

        form.reset();
    });
}

// Function to handle book card interactions
function bookCardHandlers() {
    document.querySelector('.libraryDock').addEventListener('click', function(event) {
        const bookCard = event.target.closest('.bookCard');
        if (!bookCard) return;

        const bookId = bookCard.dataset.id;
        const bookIndex = myLibrary.findIndex(function(book) {
            return book.id === bookId;
        });

        if (event.target.classList.contains('removeBtn')) {
            if (bookIndex !== -1) {
                myLibrary.splice(bookIndex, 1);
                displayBooks();
            }
        }

        if (event.target.classList.contains('toggleReadBtn')) {
            const book = myLibrary[bookIndex];
            if (book) {
                book.toggleRead();
                displayBooks();
            }
        }
    });
}

// Initialize the application
function init() {
    setupFormHandlers();
    bookCardHandlers();
    displayBooks();

    if (myLibrary.length === 0) {
        addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
        addBookToLibrary('Dune', 'Frank Herbert', 412, false);
        displayBooks();
    }
}

document.addEventListener('DOMContentLoaded', init);