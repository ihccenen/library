const myLibrary = [];

function Book(...args) {
  this.author = args[0];
  this.title = args[1];
  this.pages = args[2];
  this.read = args[3];
}

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
}

const form = document.querySelector(`[data-form='book']`);

form.addEventListener('submit', addBookToLibrary);
