export class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    readAsString() {
        return this.read ? 'read' : 'not read';
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readAsString()}`;
    }
}
const library = [];
export function addBookToLibrary(title, author, pages) {
    const id = library.length;
    let book = new Book(id, title, author, pages, false);
    library.push(book);
}
function createBooklistElement() {
    // do not create the booklist if it exists already.
    if (document.getElementById("booklist")) {
        return undefined;
    }
    let booklist = document.createElement("div");
    booklist.id = "booklist";
    booklist.style.display = "flex";
    booklist.style.flexWrap = "wrap";
    booklist.style.gap = "16px";
    booklist.style.margin = "16px";
    document.body.appendChild(booklist);
}
function createDeleteButton(card, booklist, id) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    // deleteButton.style.position = "absolute";
    deleteButton.style.top = "8px";
    deleteButton.style.right = "8px";
    deleteButton.style.backgroundColor = "#f44336";
    deleteButton.style.color = "#fff";
    deleteButton.style.border = "none";
    deleteButton.style.padding = "8px 12px";
    deleteButton.style.cursor = "pointer";
    deleteButton.style.borderRadius = "4px";
    deleteButton.style.zIndex = "10";
    // Add event listener to remove the card on click
    deleteButton.addEventListener("click", () => {
        booklist.removeChild(card); // Remove the card from the booklist
        library.splice(id, 1); // remove it from the library
    });
    return deleteButton;
}
// Function to create and display a card
function displayBookCard(book) {
    let booklist = document.getElementById("booklist");
    if (!booklist)
        return; // Early exit if booklist does not exist
    // Create a card container
    const card = document.createElement("div");
    card.style.border = "1px solid #ccc";
    card.style.padding = "16px";
    card.style.margin = "16px";
    card.style.width = "300px";
    card.style.borderRadius = "8px";
    card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    card.style.fontFamily = "Arial, sans-serif";
    // Add book fields to the card
    const titleElement = document.createElement("h2");
    titleElement.textContent = `Title: ${book.title}`;
    card.appendChild(titleElement);
    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${book.author}`;
    card.appendChild(authorElement);
    const pagesElement = document.createElement("p");
    pagesElement.textContent = `Pages: ${book.pages}`;
    card.appendChild(pagesElement);
    const readElement = document.createElement("p");
    readElement.textContent = `Status: ${book.readAsString()}`;
    card.appendChild(readElement);
    // get a reference to b
    const deleteButton = createDeleteButton(card, booklist, book.id);
    card.appendChild(deleteButton);
    booklist.appendChild(card);
}
export function displayBookList() {
    createBooklistElement();
    library.forEach(displayBookCard);
}
