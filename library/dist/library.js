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
export let library = new Map;
let last_id = 0; // keep track of bookid
function getNextId() {
    const id = last_id;
    last_id++;
    return id;
}
export function addBookToLibrary(title, author, pages) {
    let id = getNextId();
    let book = new Book(id, title, author, pages, false);
    library.set(id, book);
    return id;
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
        library.delete(id); // remove it from the library
    });
    return deleteButton;
}
// Helper function to apply the style to an element
function applyCardStyle(element) {
    element.style.border = "1px solid #ccc";
    element.style.padding = "16px";
    element.style.margin = "16px";
    element.style.width = "300px";
    element.style.borderRadius = "8px";
    element.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    element.style.fontFamily = "Arial, sans-serif";
}
// Function to create and display a card
function displayBookCard(book) {
    let booklist = document.getElementById("booklist");
    if (!booklist)
        return; // Early exit if booklist does not exist
    // Create a card container
    const card = document.createElement("div");
    applyCardStyle(card);
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
    const readInput = document.createElement("input");
    readInput.type = "checkbox";
    readInput.checked = book.read;
    const readLabel = document.createElement("label");
    readLabel.textContent = "Read?";
    card.appendChild(readInput);
    card.appendChild(readLabel);
    readInput.addEventListener("change", (event) => {
        const isChecked = event.target.checked;
        book.read = isChecked;
        // Optionally, update the display or persist the change elsewhere
    });
    // get a reference to b
    const deleteButton = createDeleteButton(card, booklist, book.id);
    card.appendChild(deleteButton);
    booklist.appendChild(card);
}
// Function to create and add a new book card
function createNewBookForm() {
    const form = document.createElement("form");
    applyCardStyle(form);
    const titleInput = document.createElement("input");
    titleInput.placeholder = "Title";
    titleInput.required = true;
    form.appendChild(titleInput);
    const authorInput = document.createElement("input");
    authorInput.placeholder = "Author";
    authorInput.required = true;
    form.appendChild(authorInput);
    const pagesInput = document.createElement("input");
    pagesInput.placeholder = "Pages";
    pagesInput.type = "number";
    pagesInput.required = true;
    form.appendChild(pagesInput);
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Book";
    form.appendChild(submitButton);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const new_id = addBookToLibrary(titleInput.value, authorInput.value, parseInt(pagesInput.value));
        const new_book = library.get(new_id);
        if (new_book) {
            displayBookCard(new_book);
        }
        // Clear the form
        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
    });
    // Find the booklist container
    const booklist = document.getElementById("booklist");
    if (booklist) {
        // Add the form as the last card in the booklist
        const lastCard = booklist.lastElementChild;
        if (lastCard) {
            booklist.insertBefore(form, lastCard.nextSibling);
        }
        else {
            // If there are no books yet, just append the form directly
            booklist.appendChild(form);
        }
    }
}
export function displayBookList() {
    createBooklistElement();
    Array.from(library.values()).forEach(displayBookCard);
    createNewBookForm();
}
