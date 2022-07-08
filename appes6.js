class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

class UI {

    addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td> <a class="delete" href="#">X</a></td>
   
    `
        list.appendChild(row);
    }

    showAlert(message, className) {
        const alertEl = document.createElement('div');
        alertEl.textContent = message;
        alertEl.className = `${className}`
        const container = document.querySelector('.container');
        // container.appendChild(alertEl);
        const formEl = document.querySelector('#book-form');
        container.insertBefore(alertEl, formEl)

        //clear alert message
        setTimeout(function () {
            alertEl.remove()
        }, 3000)
    }

    clearFields(field1, field2, field3) {
        field1.value = ''
        field2.value = ''
        field3.value = ''
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove()
        }
    }
}


class Store {

    static getBooks() {
        let books;
        if (localStorage.getItem('books') !== null) {
            books = JSON.parse(localStorage.getItem('books'));
            // return books

        } else {
            books = []
            console.log(books)
            // return books

        }

        return books;
    }


    static displayBooks() {
        let books = Store.getBooks();
        console.log(books);
        books.forEach(book => {
            const ui = new UI()
            ui.addBookToList(book)
        })
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        const ui = new UI()
        ui.addBookToList(book)


    }

    static removeBook(target) {
        let books = Store.getBooks();
        books.forEach((book, index) => {
            console.log(book.isbn, index, target.parentElement.previousElementSibling.textContent)
            if (book.isbn === target.parentElement.previousElementSibling.textContent) {
                books.splice(index, 1)
                console.log(books);
                localStorage.setItem('books', JSON.stringify(books));
                const ui = new UI()
                ui.deleteBook(target);

            }
        })
    }
}

// document.addEventListener('DOMContentLoaded', Store.getBooks);
document.addEventListener('DOMContentLoaded', Store.displayBooks);


// form listener
document.querySelector('#book-form').addEventListener('submit', function (e) {
    e.preventDefault()
    // console.log('Hello World !')
    const titleEl = document.querySelector('#title');
    const authorEl = document.querySelector('#author');
    const isbnEl = document.querySelector('#isbn');
    const title = titleEl.value;
    const author = authorEl.value;
    const isbn = isbnEl.value;

    //book instance
    const book = new Book(title, author, isbn)

    //ui instance
    const ui = new UI()

    //Validation
    if (title.trim() === '' || author.trim() === '' || isbn.trim() === '') {
        ui.showAlert('Please, fill the form', 'error')
    } else {

        ui.showAlert('Success, Book Added !', 'success');
        // ui.addBookToList(book);
        ui.clearFields(titleEl, authorEl, isbnEl);
        Store.addBook(book);

    }

})

// delete book listener
document.querySelector('#book-list').addEventListener('click', function (e) {
    // console.log(123)
    if (e.target.className === 'delete') {

        const ui = new UI();
        // ui.deleteBook(e.target);
        ui.showAlert('Book deleted !', 'success');
        Store.removeBook(e.target);
    }

})



