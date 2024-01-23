var initialDisplayStates = [];
var initialFlexDirection;

window.onload = function () {
  var contentBoxes = document.getElementsByClassName('bordered');

  for (var i = 0; i < contentBoxes.length; i++) {
    initialDisplayStates[i] = contentBoxes[i].style.display;
  }

  var parentElement = document.querySelector('.content-container');
  initialFlexDirection = window.getComputedStyle(parentElement).getPropertyValue('flex-direction');
};

function removeSymbolsAndSpaces(str) {
  return str.replace(/[^\w\s\u4e00-\u9fa5]/g, '');
}

function search(keyword) {
  keyword = removeSymbolsAndSpaces(keyword.toLowerCase());
  var contentBoxes = document.getElementsByClassName('bordered');
  var hasResults = false;

  for (var i = 0; i < contentBoxes.length; i++) {
    var content = removeSymbolsAndSpaces(contentBoxes[i].textContent.toLowerCase());
    var boxContent = removeSymbolsAndSpaces(contentBoxes[i].querySelector('.content').textContent.toLowerCase());

    if (content.includes(keyword) || boxContent.includes(keyword)) {
      contentBoxes[i].style.display = 'flex';
      hasResults = true;
    } else {
      contentBoxes[i].style.display = 'none';
    }
  }

  var resultCountElement = document.getElementById('resultCount');

  if (hasResults) {
    var resultCount = 0;
    for (var i = 0; i < contentBoxes.length; i++) {
      if (contentBoxes[i].style.display === 'flex') {
        resultCount++;
      }
    }
    resultCountElement.textContent = resultCount;
  } else {
    resultCountElement.textContent = '0';
  }
}