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

  displayBook();
}

function displayBook() {
  const bookList = document.querySelector(`[data-list='book-list']`);
  const tr = Array.from(bookList.childNodes);

  // clear tbody
  for (let prop of tr) {
    prop.remove();
  }

  myLibrary.map((book, index) => {
    const tr = document.createElement('tr');
    tr.dataset.book = index;

    for (let value in book) {
      if (book.hasOwnProperty(value)) {
        const td = document.createElement('td');

        td.appendChild(document.createTextNode(book[value]));
        tr.appendChild(td);
      }
    }

    bookList.appendChild(tr);
  });
}

const form = document.querySelector(`[data-form='book']`);

form.addEventListener('submit', addBookToLibrary);
