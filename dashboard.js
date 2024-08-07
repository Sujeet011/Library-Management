document.addEventListener("DOMContentLoaded", function () {
    const bookCountElement = document.getElementById("book-count");
    const categoryFilter = document.getElementById("categoryFilter");
    const bookTableBody = document.querySelector("#book-table tbody");

    function displayBooks(books) {
        bookTableBody.innerHTML = "";
        books.forEach((book) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.bookName}</td>
                <td>${book.authorName}</td>
                <td>${book.bookDescription}</td>
                <td>${book.addedDate}</td>
                <td>${book.bookCategory}</td>
                <td>${book.bookPrice}</td>
                <td><button class="buy-btn">Buy</button></td>
                <td><button class="bookmark-btn">Add</button></td>
            `;
            row.querySelector(".buy-btn").addEventListener("click", function () {
                let buyList = JSON.parse(localStorage.getItem("buy-list")) || [];
                buyList.push(book);
                localStorage.setItem("buy-list", JSON.stringify(buyList));
                let updatedBooks = books.filter((bk) => bk !== book);
                localStorage.setItem("book-list", JSON.stringify(updatedBooks));
                displayBooks(updatedBooks);
                updateBookCount(updatedBooks);
            });
            row.querySelector(".bookmark-btn").addEventListener("click", function () {
                let bookmarkList = JSON.parse(localStorage.getItem("bookmark-list")) || [];
                bookmarkList.push(book);
                localStorage.setItem("bookmark-list", JSON.stringify(bookmarkList));
                let updatedBooks = books.filter((bk) => bk !== book);
                localStorage.setItem("book-list", JSON.stringify(updatedBooks));
                displayBooks(updatedBooks);
                updateBookCount(updatedBooks);
            });
            bookTableBody.appendChild(row);
        });
        updateBookCount(books);
    }

    function updateBookCount(books) {
        bookCountElement.textContent = books.length;
        if (books.length === 0) {
            window.location.href = "buy.html";
        }
    }

    function filterBooksByCategory(category) {
        const books = JSON.parse(localStorage.getItem("book-list")) || [];
        if (category === "All") {
            return books;
        } else {
            return books.filter((book) => book.bookCategory === category);
        }
    }

    categoryFilter.addEventListener("change", function () {
        const selectedCategory = categoryFilter.value;
        const filteredBooks = filterBooksByCategory(selectedCategory);
        displayBooks(filteredBooks);
    });

    const allBooks = JSON.parse(localStorage.getItem("book-list")) || [];
    displayBooks(allBooks);
});
