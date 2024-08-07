document.addEventListener('DOMContentLoaded', function () {
    const myBooksTableBody = document.querySelector('#my-books-table tbody');

    function displayMyBooks(books) {
        myBooksTableBody.innerHTML = '';
        books.forEach((book , index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.bookName}</td>
                <td>${book.authorName}</td>
                <td>${book.bookDescription}</td>
                <td>${book.addedDate}</td>
                <td>${book.bookCategory}</td>
                <td>${book.bookPrice}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            row.querySelector('.delete-btn').addEventListener('click', function () {
                books.splice(index, 1);
                localStorage.setItem('buy-list', JSON.stringify(books));
                displayMyBooks(books);
            });
            myBooksTableBody.appendChild(row);
        });
    }

    const myBooks = JSON.parse(localStorage.getItem('buy-list')) || [];
    displayMyBooks(myBooks);
});
