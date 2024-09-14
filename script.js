class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
  }
}

const myLibrary = [];


function addBookToLibrary() {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  const pages = document.querySelector('.pages');
  const read = document.querySelector('#read');
  const conainer = document.querySelector('.form-container');
  
  const book = new Book(title.value, author.value, pages.value, read.value);
  myLibrary.push(book);
  conainer.remove();

  console.log(myLibrary);
}

addBtn = document.querySelector('#add');
addBtn.addEventListener('click', () => showBookForm());


function showBookForm() {
    const body = document.querySelector('body');
    const container = document.createElement('div');
    const title = document.createElement('input');
    const author = document.createElement('input');
    const pages = document.createElement('input');
    const read = document.createElement('label');
    const readCheck = document.createElement('input');
    const confirm = document.createElement('button');
    const close = document.createElement('button');

    title.setAttribute('placeholder', 'Title');
    title.classList.add('title');
    author.setAttribute('placeholder', 'Author');
    author.classList.add('author');
    pages.setAttribute('placeholder', 'Pages');
    pages.setAttribute('type', 'number');
    pages.classList.add('pages');
    readCheck.setAttribute('type', 'checkbox');
    readCheck.setAttribute('id', 'read');
    read.setAttribute('for', 'read');


    read.textContent = 'Have you read it?';
    close.textContent = '×';
    confirm.textContent = 'Add new book';

    container.append(close, title, author, pages, readCheck, read, confirm);
    container.classList.add('form-container')
    body.appendChild(container);

    confirm.addEventListener('click', () => addBookToLibrary());
}



