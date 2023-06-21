// Add arrow key page navigation. Furo theme does not implement it.
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 39) { // Right arrow key
      var nextPageLink = document.querySelector('.next-page');
      if (nextPageLink) {
        nextPageLink.click();
      }
    } else if (event.keyCode === 37) { // Left arrow key
      var prevPageLink = document.querySelector('.prev-page');
      if (prevPageLink) {
        prevPageLink.click();
      }
    }
  });
});
