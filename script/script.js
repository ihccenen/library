const myLibrary = [];

function Book(...args) {
  this.author = args[0];
  this.title = args[1];
  this.pages = args[2];
  this.read = args[3];
}

Book.prototype.status = function () {
  if (this.read === 'Finished') {
    this.read = 'Not Yet';

    return;
  }

  this.read = 'Finished';
};

function addBookToLibrary(event) {
  event.preventDefault();

  const readStatus = form[4].checked ? 'Finished' : 'Not Yet';
  const newBook = new Book(
    form[0].value,
    form[1].value,
    form[2].value,
    readStatus
  );

  myLibrary.push(newBook);
  displayBook(newBook);
  clearForm();
}

function displayBook(book) {
  const display = document.querySelector(`[data-display='container']`);
  const div = document.createElement('div');
  const deleteBtn = document.createElement('button');

  div.classList.add('book-card', 'flex-container');
  div.dataset.book = myLibrary.indexOf(book);
  deleteBtn.type = 'button';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', removeBook);

  for (let key in book) {
    if (!book.hasOwnProperty(key)) continue;

    const textDiv = document.createElement('div');

    textDiv.appendChild(
      document.createTextNode(
        `${key[0].toUpperCase() + key.slice(1)}: ${book[key]}`
      )
    );

    div.appendChild(textDiv);
  }

  div.appendChild(deleteBtn);
  display.appendChild(div);
}

function removeBook(event) {
  const bookCard = event.target.parentElement;

  myLibrary.splice(bookCard.dataset.book, 1);

  bookCard.remove();

  const display = Array.from(
    document.querySelector(`[data-display='container']`).childNodes
  );

  display.map((book, index) => {
    book.dataset.book = index;
  });
}

function showForm() {
  const modal = document.querySelector('.modal');

  modal.style.display = 'flex';
}

function clearForm() {
  const modal = document.querySelector('.modal');

  form.reset();
  modal.style.display = 'none';
}

const form = document.querySelector(`[data-form='book']`);
const btn = document.querySelector(`[data-button='new-book']`);
const closeBtn = document.querySelector(`[data-button='close-modal']`);

form.addEventListener('submit', addBookToLibrary);
btn.addEventListener('click', showForm);
closeBtn.addEventListener('click', clearForm);
