// console.log("This is index.js");
show();
// Constructor
function book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

function show() {
  let tableBody = document.getElementById("tableBody");
  let Books = localStorage.getItem("Books");
  if (Books == null) {
    localStorage.clear();
    booksObj = [];
  } else {
    booksObj = JSON.parse(Books);
  }
  let uiString;
  booksObj.forEach(function (element, index) {
    uiString += `<tr>
                  <td>${element.name}</td>
                  <td>${element.author}</td>
                  <td>${element.type}</td>
                  <td class="bg-danger deleteButton" onclick="deleteNote(${index})" style="width: 100px; height: 5px; cursor: pointer;">Delete</td>
              </tr>`;
  });
  if (booksObj.length != 0) {
    tableBody.innerHTML = uiString;
  } else {
    tableBody.innerHTML = "Noting to show";
  }
}

// Display constructor
function Display() {}

// Add method to display prototypes
Display.prototype.add = function (book) {
  // console.log("Adding to ui");
  let Books = localStorage.getItem("Books");
  if (Books == null) {
    localStorage.clear();
    booksObj = [];
  } else {
    booksObj = JSON.parse(Books);
  }
  let MyObj = {
    name: book.name,
    author: book.author,
    type: book.type,
  };
  booksObj.unshift(MyObj);
  localStorage.setItem("Books", JSON.stringify(booksObj));
  show();
};
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};
Display.prototype.validate = function (book) {
  if (book.name.length > 2 || book.author.length != 0) {
    return true;
  } else {
    return false;
  }
};
Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `
                        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>message</strong> ${displayMessage}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
  setInterval(function () {
    message.innerHTML = ``;
  }, 2000);
};

function deleteNote(index) {
  console.log("i am deleting", index);
  let Books = localStorage.getItem("Books");
  if (Books == null) {
    localStorage.clear();
    booksObj = [];
  } else {
    booksObj = JSON.parse(Books);
  }
  booksObj.splice(index, 1);
  localStorage.setItem("Books", JSON.stringify(booksObj));
  show();
}

// Add submit event listener to libraryform
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);
function libraryFormSubmit(e) {
  e.preventDefault();
  // console.log("thanks for submiting book");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let Fiction = document.getElementById("Fiction");
  let Proggraming = document.getElementById("Proggraming");
  let Cooking = document.getElementById("Cooking");
  if (Fiction.checked) {
    type = Fiction.value;
  } else if (Proggraming.checked) {
    type = Proggraming.value;
  } else if (Cooking.checked) {
    type = Cooking.value;
  }
  let Book = new book(name, author, type);
  // console.log(Book);

  let display = new Display();
  if (display.validate(Book)) {
    display.add(Book);
    display.clear();
    display.show("Success", "Your book has been succesfully added");
  } else {
    display.show("danger", "sorry please type correct info");
  }
}

// to do's
// 1)store all the data to the localStorage
// 2)delete a book
// 3)Add a scrool bar for books
