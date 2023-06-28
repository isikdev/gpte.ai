const GLOBAL = {
  ADD_BOOKMARK_MSG: `Saved!`,
  REMOVE_BOOKMARK_MSG: `Removed!`,
};

let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

const initiateBookmarks = function () {
  document.addEventListener('click', handleBookmark); // Attach event listener to the document
  updateBookmarkBar(); // Update bookmark buttons on initial load
};

const updateBookmarkBar = function () {
  const bookmarkBtnList = document.querySelectorAll('.js-handle-bookmark');
  if (bookmarkBtnList.length > 0) {
    bookmarkBtnList.forEach((bookmarkBtn) => {
      const bookmarked = bookmarks.some((i) => i.id.includes(bookmarkBtn.getAttribute('data-id')));
      bookmarked ? bookmarkBtn.classList.add('bookmarked') : bookmarkBtn.classList.remove('bookmarked');
    });
  }
};

const handleBookmark = function (event) {
  const target = event.target.closest('.js-handle-bookmark');
  if (target) {
    const bookmarkObject = {
      id: target.getAttribute('data-id'),
      url: target.getAttribute('data-url'),
      title: target.getAttribute('data-title'),
      image_url: target.getAttribute('data-image'),
    };

    const bookmarkIndex = bookmarks.findIndex((b) => b.id === bookmarkObject.id);
    if (bookmarkIndex !== -1) {
      // Remove bookmark
      bookmarks.splice(bookmarkIndex, 1);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
      // Add bookmark
      bookmarks.push(bookmarkObject);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    updateBookmarkBar();
  }
};

initiateBookmarks();
