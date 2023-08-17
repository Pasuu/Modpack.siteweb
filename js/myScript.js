  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?1eb579bfd5bf16e21a7dff4310aa4069";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();


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



  window.addEventListener('DOMContentLoaded', function() {
    var imageContainers = document.getElementsByClassName('image-container');
    var countImageContainers = imageContainers.length;
    
    var countElement = document.getElementById('count');
    countElement.textContent = countImageContainers;
  });