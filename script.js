const librarySection = document.getElementById("library-section");

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

const myLibrary = [];

myLibrary.push(
  new Book("1984", "George Orwell", 328, true),
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, true),
  new Book("Atomic Habits", "James Clear", 320, false),
);

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, pages, read);

  myLibrary.unshift(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);

function renderBooks() {
  myLibrary.forEach((book) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");

    const newTitle = document.createElement("h2");
    newTitle.classList.add("title");
    newTitle.innerHTML = book.title;

    const newAuthor = document.createElement("p");
    newAuthor.innerHTML = book.author;
    newAuthor.classList.add("author");

    const newPages = document.createElement("p");
    newPages.classList.add("pages");
    newPages.innerHTML = book.pages;

    const readIcon = document.createElement("span");
    readIcon.classList.add("read-icon");
    readIcon.textContent = book.read ? "✅" : "❌";

    newDiv.append(newTitle, newAuthor, newPages, readIcon);

    librarySection.appendChild(newDiv);

    console.log(newDiv);
  });
}

renderBooks();
