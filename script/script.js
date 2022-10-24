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

  displayBook() {
    const display = document.querySelector('[data-display]')
    const bookDiv = document.createElement('div')
    const deleteBookBtn = document.createElement('button')

    bookDiv.classList.add('book-card', 'flex-container')
    bookDiv.dataset.book = myLibrary.length - 1
    bookDiv.append(deleteBookBtn)
    deleteBookBtn.classList.add('delete-btn')
    deleteBookBtn.addEventListener('click', removeBook)

    for (let key in this) {
      const div = document.createElement('div')

      div.appendChild(
        document.createTextNode(
          `${key[0].toUpperCase()}${key.slice(1)}: ${this[key]} `
        )
      )

      bookDiv.appendChild(div)
    }

    display.appendChild(bookDiv)
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
  newBook.displayBook()
  clearForm()
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
