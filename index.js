document
.getElementById("book-form")
.addEventListener("submit", function (event) {
  event.preventDefault();
  let bookName = document.getElementById("bookName").value;
  let authorName = document.getElementById("authorName").value;
  let bookDescription = document.getElementById("bookDescription").value;
  let addedDate = document.getElementById("addedDate").value;
  let bookCategory = document.getElementById("bookCategory").value;
  let bookPrice = parseFloat(document.getElementById("bookPrice").value);

  if (isNaN(bookPrice) || bookPrice <= 0) {
    alert("Please enter a valid book price.");
    return;
  }

  let book = {
    bookName: bookName,
    authorName: authorName,
    bookDescription: bookDescription,
    addedDate: addedDate,
    bookCategory: bookCategory,
    bookPrice: bookPrice,
  };

  let books = JSON.parse(localStorage.getItem("book-list")) || [];
  books.push(book);
  localStorage.setItem("book-list", JSON.stringify(books));

  alert("Book added successfully!");
  this.reset();
      window.location.href = "dashboard.html";
});