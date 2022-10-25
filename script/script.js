const myLibrary = []

class Book {
  constructor(...args) {
    ;[this.author, this.title, this.pages, this.read] = args
  }

  changeStatus() {
    if (this.read === 'Not Yet') this.read = 'Finished'
    else this.read = 'Not Yet'
  }

  displayBook() {
    const display = document.querySelector('[data-display]')
    const bookDiv = this.createBookCard()
    const deleteBookBtn = document.createElement('button')

    bookDiv.classList.add('book-card', 'flex-container')
    bookDiv.dataset.book = myLibrary.length - 1
    deleteBookBtn.classList.add('delete-btn')
    deleteBookBtn.addEventListener('click', this.removeBook)

    bookDiv.append(deleteBookBtn)
    display.appendChild(bookDiv)
  }

  createBookCard() {
    const cardDiv = document.createElement('div')

    for (let key in this) {
      const div = document.createElement('div')

      div.appendChild(
        document.createTextNode(
          `${key[0].toUpperCase()}${key.slice(1)}: ${this[key]} `
        )
      )

      if (key === 'read') {
        const statusBtn = document.createElement('button')

        statusBtn.type = 'button'
        statusBtn.classList.add('status-btn')
        statusBtn.addEventListener('click', this.changeDisplayStatus)
        div.classList.add('status')
        div.appendChild(statusBtn)
      }

      cardDiv.appendChild(div)
    }

    return cardDiv
  }

  changeDisplayStatus(event) {
    const bookCard = event.target.parentElement
    const bookIndex = bookCard.parentElement.dataset.book

    myLibrary[bookIndex].changeStatus()

    // change firstChild to not make the button disappear
    bookCard.firstChild.textContent = `Read: ${myLibrary[bookIndex].read}`
  }

  removeBook(event) {
    const bookCard = event.target.parentElement

    bookCard.remove()
    myLibrary.splice(bookCard.dataset.book, 1)

    const cardGrid = Array.from(document.querySelectorAll('[data-book]'))

    cardGrid.forEach((card, index) => (card.dataset.book = index))
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

function showForm() {
  const modal = document.querySelector('.modal')

  modal.style.display = 'flex'
}

function clearForm() {
  const modal = document.querySelector('.modal')

  form.reset()
  modal.style.display = 'none'
}

const form = document.querySelector('[data-form]')
const btn = document.querySelector('[data-button="new-book"]')
const closeBtn = document.querySelector('[data-button="close-modal"]')

form.addEventListener('submit', addBookToLibrary)
btn.addEventListener('click', showForm)
closeBtn.addEventListener('click', clearForm)
