const myLibrary = [];

function closeModal() {
  const form = document.querySelector('[data-form]');
  const overlay = document.querySelector('[data-overlay="modal"]');
  const modal = document.querySelector('[data-modal="book-form"]');

  overlay.classList.add('hidden');
  modal.classList.add('hidden');
  form.reset();
}

function openModal() {
  const overlay = document.querySelector('[data-overlay="modal"]');
  const modal = document.querySelector('[data-modal="book-form"]');

  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');

  overlay.addEventListener('click', closeModal, { once: true });
}

class Book {
  #author;

  #title;

  #status;

  #pages;

  constructor({
    author, title, status, pages
  }) {
    this.#author = author;
    this.#title = title;
    this.#pages = pages;
    this.#status = status;
  }

  updateStatus() {
    if (this.#status === 'completed') {
      this.#status = 'reading';
    } else {
      this.#status = 'completed';
    }

    return new Book(this);
  }

  get status() {
    return this.#status;
  }
}

function removeBook(e) {
  const container = document.querySelector('[data-display="book"]');
  const tr = e.target.closest('[data-tr="book"]');
  const index = Array.from(container.childNodes).indexOf(tr);

  myLibrary.splice(index, 1);
  tr.remove();
}

function displayBook({
  author, title, pages, status
}) {
  const container = document.querySelector('[data-display="book"]');
  const tr = document.createElement('tr');
  const authorTd = document.createElement('td');
  const titleTd = document.createElement('td');
  const pagesTd = document.createElement('td');
  const statusTd = document.createElement('td');
  const updateBookBtnTd = document.createElement('td');
  const updateBookBtn = document.createElement('button');
  const removeBookBtnTd = document.createElement('td');
  const removeBookBtn = document.createElement('button');

  tr.dataset.tr = 'book';

  authorTd.textContent = author;

  titleTd.textContent = title;

  pagesTd.textContent = pages;

  statusTd.textContent = status.replace(/^./i, (c) => c.toUpperCase());
  statusTd.dataset.book = 'status';

  updateBookBtnTd.classList = 'btn-td';

  updateBookBtn.type = 'button';
  updateBookBtn.textContent = 'Status';
  updateBookBtn.dataset.btn = 'update-book';
  updateBookBtn.classList.add('status-btn');

  removeBookBtnTd.classList = 'btn-td';

  removeBookBtn.type = 'button';
  removeBookBtn.textContent = 'X';
  removeBookBtn.classList.add('red-btn');
  removeBookBtn.dataset.btn = 'remove-book';

  updateBookBtnTd.appendChild(updateBookBtn);
  removeBookBtnTd.appendChild(removeBookBtn);
  tr.append(
    authorTd,
    titleTd,
    pagesTd,
    statusTd,
    updateBookBtnTd,
    removeBookBtnTd
  );
  container.appendChild(tr);
}

function addBookToLibrary(e) {
  e.preventDefault();

  const obj = Object.fromEntries(new FormData(e.target));
  const book = new Book(obj);

  displayBook(obj);
  myLibrary.push(book);
  closeModal();
}

function updateTodoStatus(e) {
  const container = document.querySelector('[data-display="book"]');
  const tr = e.target.closest('[data-tr="book"]');
  const td = tr.querySelector('[data-book="status"]');
  const index = Array.from(container.childNodes).indexOf(tr);

  myLibrary[index] = myLibrary[index].updateStatus();
  td.textContent = myLibrary[index].status.replace(/^./, (c) => c.toUpperCase());
}

const container = document.querySelector('[data-display="book"]');
const form = document.querySelector('[data-form="book"]');
const btn = document.querySelector('[data-btn="new-book"]');
const closeBtn = document.querySelector('[data-button="close-modal"]');

form.addEventListener('submit', addBookToLibrary);
btn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
container.addEventListener('click', (e) => {
  if (e.target.dataset.btn === 'remove-book') removeBook(e);
  else if (e.target.dataset.btn === 'update-book') updateTodoStatus(e);
});
