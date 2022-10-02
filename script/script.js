const myLibrary = [];

function Book(...args) {
  this.author = args[0];
  this.title = args[1];
  this.pages = args[2];
  this.read = args[3];
}

Book.prototype.displayBook = function () {
  const tbody = document.querySelector(`[data-list='book-list']`);
  const tr = document.createElement('tr');

  for (let key in this) {
    if (!this.hasOwnProperty(key)) continue;

    const td = document.createElement('td');

    td.appendChild(document.createTextNode(this[key]));
    tr.appendChild(td);
  }

  tr.dataset.book = tbody.childNodes.length;
  tbody.appendChild(tr);
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

  newBook.displayBook();
  myLibrary.push(newBook);
}

const form = document.querySelector(`[data-form='book']`);

form.addEventListener('submit', addBookToLibrary);
