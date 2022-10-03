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
  clearForm();
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

btn.addEventListener('click', showForm);
closeBtn.addEventListener('click', clearForm);
