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
  const deleteBtn = document.createElement('button');

  tr.dataset.book = tbody.childNodes.length;

  deleteBtn.type = 'button';
  deleteBtn.classList = 'delete-btn';
  deleteBtn.appendChild(document.createTextNode('X'));
  deleteBtn.addEventListener('click', removeBook);

  for (let key in this) {
    if (!this.hasOwnProperty(key)) continue;

    const td = document.createElement('td');

    td.appendChild(document.createTextNode(this[key]));

    if (key === 'read') {
      const changeStatusBtn = document.createElement('button');
      changeStatusBtn.type = 'button';
      changeStatusBtn.addEventListener('click', changeStatus);
      td.appendChild(changeStatusBtn);
    }

    tr.appendChild(td);
  }

  tr.appendChild(deleteBtn);
  tbody.appendChild(tr);
};

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

  newBook.displayBook();
  myLibrary.push(newBook);
}

function removeBook(event) {
  const tr = event.target.parentElement;

  myLibrary.splice(tr.dataset.book, 1);
  tr.remove();

  myLibrary.map((book, index) => {
    const tr = Array.from(document.querySelectorAll('[data-book]'));

    tr[index].dataset.book = index;
  });
}

function changeStatus(event) {
  const td = event.target.parentElement;
  const trNum = td.parentElement.dataset.book;

  myLibrary[trNum].status();

  td.firstChild.textContent = myLibrary[trNum].read;
}

const form = document.querySelector(`[data-form='book']`);

form.addEventListener('submit', addBookToLibrary);
