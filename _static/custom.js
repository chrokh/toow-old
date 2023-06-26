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


// Scroll in TOC navigation so that current title is visible.
document.addEventListener('DOMContentLoaded', function() {
  // Find the first h1 element and grab its text
  var h1Elements = document.getElementsByTagName('h1');
  var currentTitle = h1Elements[0].innerText;

  // Find the first list item that contains the currentTitle
  var currentTocItem = findListItemByText(currentTitle);

  // Scroll the sidebar-scroll div to make the currentTocItem appear in the top third
  if (currentTocItem) {
    var sidebarScrollDiv = document.querySelector('.sidebar-scroll');
    var sidebarHeight = sidebarScrollDiv.offsetHeight;
    var listItemTopOffset = currentTocItem.offsetTop;
    var topThirdHeight = sidebarHeight / 3;
    var scrollToY = listItemTopOffset - (2 * topThirdHeight);
    sidebarScrollDiv.scrollTop = scrollToY;
  }
});

function findListItemByText(text) {
  // Find all the list items on the page
  var listItems = document.getElementsByTagName('li');

  // Loop through each list item and check if its text contains the given text
  for (var i = 0; i < listItems.length; i++) {
    var listItemText = listItems[i].innerText;
    if (listItemText.includes(text)) {
      return listItems[i];
    }
  }

  return null;
}
