const librarySection = document.getElementById("library-section");
const bookDialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");
const librarySummary = document.getElementById("library-summary");

const DELETE_ICON_SVG = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    `;
const READ_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-check-icon lucide-book-open-check"><path d="M12 21V7"/><path d="m16 12 2 2 4-4"/><path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"/></svg>`;
const NOT_READ_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>`;

function Book(title, author, pages, read) {
  if (!new.target) {
    throw new Error(
      "You must include the 'new' keyword when calling this function",
    );
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const myLibrary = [];

myLibrary.push(
  new Book("1984", "George Orwell", 328, true),
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, true),
  new Book("Atomic Habits", "James Clear", 320, false),
);

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);
  renderBooks();
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("card");

  const mainWrapper = document.createElement("div");
  mainWrapper.classList.add("main-wrapper");

  const bookTitle = document.createElement("h2");
  bookTitle.classList.add("title");
  bookTitle.innerHTML = book.title;

  const textWrapper = document.createElement("div");
  textWrapper.classList.add("text-wrapper");

  const author = document.createElement("p");
  author.innerHTML = book.author;
  author.classList.add("author");

  const textSpacer = document.createElement("p");
  textSpacer.innerHTML = "-";

  const pages = document.createElement("p");
  pages.classList.add("pages");
  pages.innerHTML = book.pages;

  textWrapper.append(author, textSpacer, pages);
  mainWrapper.append(bookTitle, textWrapper);

  const readBtn = document.createElement("button");
  readBtn.classList.toggle("read-icon", book.read);
  readBtn.classList.toggle("not-read-icon", !book.read);
  readBtn.innerHTML = book.read ? READ_ICON_SVG : NOT_READ_ICON_SVG;
  readBtn.addEventListener("click", () => {
    book.toggleRead();
    updateReadButton(readBtn, book);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-icon");
  deleteBtn.innerHTML = DELETE_ICON_SVG;

  deleteBtn.addEventListener("click", () => deleteBook(book, bookCard));

  bookCard.append(readBtn, mainWrapper, deleteBtn);

  librarySection.appendChild(bookCard);
}

function updateReadButton(button, book) {
  button.classList.toggle("read-icon", book.read);
  button.classList.toggle("not-read-icon", !book.read);
  button.innerHTML = book.read ? READ_ICON_SVG : NOT_READ_ICON_SVG;
  updateLibrarySummary();
}

function deleteBook(book, bookCard) {
  const index = myLibrary.findIndex((b) => b.id === book.id);
  myLibrary.splice(index, 1);

  bookCard.remove();
  updateLibrarySummary();
}

function renderBooks() {
  librarySection.innerHTML = "";
  myLibrary.forEach(createBookCard);
  updateLibrarySummary();
}

function updateLibrarySummary() {
  const totalBooks = myLibrary.length;
  const readBooks = myLibrary.filter((b) => b.read).length;

  librarySummary.innerHTML = `${totalBooks} books - ${readBooks} read`;
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let bookTitle = document.getElementById("book-title");
  let authorName = document.getElementById("author-name");
  let numberOfPages = document.getElementById("number-of-pages");
  let readOrNot = document.getElementById("read-or-not");

  if (
    bookTitle.value == "" ||
    authorName.value == "" ||
    numberOfPages.value == ""
  ) {
    alert("Make sure to fill in all fields.");
  } else {
    console.log(
      `${bookTitle.value}, ${authorName.value}, ${numberOfPages.value}, ${readOrNot.checked}`,
    );
    addBookToLibrary(
      bookTitle.value,
      authorName.value,
      numberOfPages.value,
      readOrNot.checked,
    );
  }

  bookForm.reset();
  bookDialog.close();
});

renderBooks();
