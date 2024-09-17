
let myLibrary = JSON.parse(localStorage.getItem('library'))

if (myLibrary == null) {
  myLibrary = [];
}else{
  renderAllCards();
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  };
}

function info (book) {
      return [book.title, `by ${book.author}`, `${book.pages} pages`, book.read]
  }

function renderCard(info){
  const card = document.createElement('div');
  for (let i=0; i<=2; i++){
    p = document.createElement('p');
    p.textContent = info[i];
    card.append(p)
  }

  const btn = document.createElement('button');
  if (info[3]){
    btn.textContent = 'Read';
    btn.classList.add('read');
  }else{
    btn.textContent = 'Not Read';
    btn.classList.add('notRead');
  }
  const del = document.createElement('button');
  del.textContent = 'Delete Card';
  del.classList.add('delete');
  card.classList.add('card');
  card.append(btn, del);
  const container = document.querySelector('#cards');
  container.append(card);

  del.addEventListener('click', () => {deleteCard(del.parentElement)})
  btn.addEventListener('click', () => {changeBookStatus(btn)})
}

function renderAllCards(){
  for (let el in myLibrary){
    renderCard(info(myLibrary[el]))
  }
}

function deleteCard(card){
  const cont = document.querySelector('#cards');
  const cards = Array.from(cont.childNodes)
  myLibrary.splice(cards.indexOf(card), 1)
  card.remove();
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function addBookToLibrary() {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  const pages = document.querySelector('.pages');
  const read = document.querySelector('#read');

  if (title.value == '' || author.value == '' || pages.value == ''){
    for (el of [title, author, pages]){
      if (el.value == '')
        el.classList.add('required')
      else
      el.classList.remove('required')
    } 
  }
  else {
    const book = new Book(title.value, author.value, pages.value, read.checked);
    myLibrary.push(book);
    deleteForm();

    renderCard(info(book));
    localStorage.setItem('library', JSON.stringify(myLibrary));
    console.log(myLibrary);}
}

function deleteForm(){
  const div = document.querySelector('.back');
  div.remove();
  addBtn.removeAttribute('disabled', '');
}

function showBookForm() {
    addBtn.setAttribute('disabled', '');

    const body = document.querySelector('body');
    const div = document.createElement('div');
    const container = document.createElement('form');
    const title = document.createElement('input');
    const author = document.createElement('input');
    const pages = document.createElement('input');
    const readDiv = document.createElement('div');
    const read = document.createElement('label');
    const readCheck = document.createElement('input');
    const confirm = document.createElement('button');
    const close = document.createElement('button');

    div.classList.add('back');
    container.setAttribute('action', '#');
    container.setAttribute('method', 'post');
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
    close.classList.add('close');


    read.textContent = 'Have you read it?';
    close.textContent = '×';
    confirm.textContent = 'Add new book';
    confirm.setAttribute('type', 'button');
    readDiv.append(readCheck, read);
    container.append(close, title, author, pages, readDiv, confirm);
    container.classList.add('form-container')
    div.appendChild(container);

    body.append(div);
  

    close.addEventListener('click', () => {deleteForm()});
    confirm.addEventListener('click', () => {addBookToLibrary()});
}

function changeBookStatus(button){
  const cont = document.querySelector('#cards');
  const cards = Array.from(cont.childNodes)
  myLibrary[cards.indexOf(button.parentElement)].read = !(myLibrary[cards.indexOf(button.parentElement)].read)
  if (button.classList.contains('read')){
    button.classList.add('notRead');
    button.classList.remove('read');
    button.textContent = 'Not Read'
  }else{
    button.classList.remove('notRead');
    button.classList.add('read');
    button.textContent = 'Read';
  }
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

addBtn = document.querySelector('#add');
addBtn.addEventListener('click', () => {showBookForm()});