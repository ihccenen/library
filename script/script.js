const myLibrary = []

class Book {
  constructor(...args) {
    ;[this.author, this.title, this.pages, this.read] = args
  }

  status() {
    if (this.read === 'Finished') {
      this.read = 'Not Yet'
      return
    }

    this.read = 'Finished'
  }
}

function addBookToLibrary(event) {
  event.preventDefault()

  const readStatus = form[4].checked ? 'Finished' : 'Not Yet'
  const newBook = new Book(
    form[0].value,
    form[1].value,
    form[2].value,
    readStatus
  )

  myLibrary.push(newBook)
  displayBook(newBook)
  clearForm()
}

function displayBook(book) {
  const display = document.querySelector(`[data-display]`)
  const div = document.createElement('div')
  const deleteBtn = document.createElement('button')

  div.classList.add('book-card', 'flex-container')
  div.dataset.book = myLibrary.indexOf(book)
  deleteBtn.type = 'button'
  deleteBtn.classList.add('delete-btn')
  deleteBtn.addEventListener('click', removeBook)

  for (let key in book) {
    if (!book.hasOwnProperty(key)) continue

    const textDiv = document.createElement('div')

    textDiv.appendChild(
      document.createTextNode(
        `${key[0].toUpperCase() + key.slice(1)}: ${book[key]}`
      )
    )

    if (key === 'read') {
      const statusBtn = document.createElement('button')

      statusBtn.type = 'button'
      statusBtn.classList.add('status-btn')
      statusBtn.addEventListener('click', changeStatus)
      textDiv.classList.add('status')
      textDiv.appendChild(statusBtn)
    }

    div.appendChild(textDiv)
  }

  div.appendChild(deleteBtn)
  display.appendChild(div)
}

function removeBook(event) {
  const bookCard = event.target.parentElement

  myLibrary.splice(bookCard.dataset.book, 1)

  bookCard.remove()

  const display = Array.from(
    document.querySelector(`[data-display]`).childNodes
  )

  display.map((book, index) => {
    book.dataset.book = index
  })
}

function changeStatus(event) {
  const text = event.target.parentElement
  const bookNum = text.parentElement.dataset.book

  myLibrary[bookNum].status()

  text.firstChild.textContent = `Read: ${myLibrary[bookNum].read}`
}

function showForm() {
  const modal = document.querySelector('.modal')

  modal.style.display = 'flex'
}

function clearForm() {
  const modal = document.querySelector('.modal')

  form.reset()
  modal.style.display = 'none'
}

const form = document.querySelector(`[data-form]`)
const btn = document.querySelector(`[data-button='new-book']`)
const closeBtn = document.querySelector(`[data-button='close-modal']`)

form.addEventListener('submit', addBookToLibrary)
btn.addEventListener('click', showForm)
closeBtn.addEventListener('click', clearForm)
