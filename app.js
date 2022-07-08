//https://github.com/garbolovo/BookList.git
// Book constructor
const Book = function (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI() {
}

//UI Add book method
UI.prototype.addBookToList = function (book) {
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

//UI Show alert
UI.prototype.showAlert = function (message, className) {
    // console.log('ALERT !')

    const alertEl = document.createElement('div');
    alertEl.textContent = message;
    alertEl.className = `${className}`
    const container = document.querySelector('.container');
    // container.appendChild(alertEl);
    const formEl = document.querySelector('#book-form');
    container.insertBefore(alertEl, formEl)

    // console.log(alertEl)

    //clear alert message
    setTimeout(function () {
        alertEl.remove()
    }, 3000)
}


//UI clear form fields
UI.prototype.clearFields = function (field1, field2, field3) {

    field1.value = ''
    field2.value = ''
    field3.value = ''

}

//UI delete book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove()
    }
}

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
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please, fill form.', 'error')
    } else {

        ui.showAlert('Success, Book Added !', 'success');
        ui.addBookToList(book);
        ui.clearFields(titleEl, authorEl, isbnEl);

    }

})

// delete book listener
document.querySelector('#book-list').addEventListener('click', function (e) {
    // console.log(123)

    const ui = new UI();
    ui.deleteBook(e.target)
    ui.showAlert('Book deleted !', 'success')

})

