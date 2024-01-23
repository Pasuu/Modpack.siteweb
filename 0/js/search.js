var initialDisplayStates = [];
var initialFlexDirection;

function removeSymbolsAndSpaces(str) {
  return str.replace(/[^\w\s\u4e00-\u9fa5]/g, '');
}

function search(keyword) {
  keyword = removeSymbolsAndSpaces(keyword.toLowerCase());
  var contentBoxes = document.getElementsByClassName('bordered');

  var hasResults = false;

  for (var i = 0; i < contentBoxes.length; i++) {
    var boxContent = removeSymbolsAndSpaces(contentBoxes[i].querySelector('#pack-name').textContent.toLowerCase());

    if (boxContent.includes(keyword)) {
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