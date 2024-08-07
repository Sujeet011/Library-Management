document.addEventListener('DOMContentLoaded', function () {
    const bookmarkTableBody = document.querySelector('#bookmark-table tbody');

    function displayBookmarks(bookmarks) {
        bookmarkTableBody.innerHTML = '';
        bookmarks.forEach((bookmark, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bookmark.bookName}</td>
                <td>${bookmark.authorName}</td>
                <td>${bookmark.bookDescription}</td>
                <td>${bookmark.addedDate}</td>
                <td>${bookmark.bookCategory}</td>
                <td>${bookmark.bookPrice}</td>
                <td><button class="buy-btn" data-index="${index}">Buy</button></td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            row.querySelector('.buy-btn').addEventListener('click', function () {
                const buyList = JSON.parse(localStorage.getItem('buy-list')) || [];
                buyList.push(bookmark);
                localStorage.setItem('buy-list', JSON.stringify(buyList));
                bookmarks.splice(index, 1);
                localStorage.setItem('bookmark-list', JSON.stringify(bookmarks));
                displayBookmarks(bookmarks);
                window.location.href = 'buy.html';
               });
            row.querySelector('.delete-btn').addEventListener('click', function () {
                bookmarks.splice(index, 1);
                localStorage.setItem('bookmark-list', JSON.stringify(bookmarks));
                displayBookmarks(bookmarks);
            });
            bookmarkTableBody.appendChild(row);
        });
    }

    const bookmarks = JSON.parse(localStorage.getItem('bookmark-list')) || [];
    displayBookmarks(bookmarks);
});
