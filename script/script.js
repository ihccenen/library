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

      cardDiv.appendChild(div)
    }

    return cardDiv
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
