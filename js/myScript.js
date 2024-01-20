
  var initialDisplayStates = [];
var initialFlexDirection;

window.onload = function() {
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
  var contentContainers = document.getElementsByClassName('content-container');
  var hasResults = false;
  
  for (var i = 0; i < contentBoxes.length; i++) {
    var content = removeSymbolsAndSpaces(contentBoxes[i].textContent.toLowerCase());
    var boxContent = removeSymbolsAndSpaces(contentBoxes[i].querySelector('.content').textContent.toLowerCase());
    
    if (content.includes(keyword) || boxContent.includes(keyword)) {
      contentBoxes[i].style.display = 'flex';
      var parentElement = contentBoxes[i].closest('.content-container');
      if (parentElement) {
        parentElement.style.flexDirection = 'column'; 
      }
      hasResults = true; 
    } else {
      contentBoxes[i].style.display = 'none';
      var parentElement = contentBoxes[i].closest('.content-container');
      if (parentElement) {
        parentElement.style.flexDirection = 'row'; 
      }
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
    resultCountElement.textContent = '' + resultCount;
  } else {
    resultCountElement.textContent = '0';
  }

  for (var i = 0; i < contentContainers.length; i++) {
    if (keyword.length > 0 && hasResults) {
      contentContainers[i].style.flexDirection = 'column';
    } else {
      contentContainers[i].style.flexDirection = initialFlexDirection; // Restore default layout
    }
  }
}

function showAll() {
  var contentBoxes = document.getElementsByClassName('bordered');
  for (var i = 0; i < contentBoxes.length; i++) {
    contentBoxes[i].style.display = initialDisplayStates[i];
  }
}

