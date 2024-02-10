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
  const contentBoxes = document.getElementsByClassName('bordered');
  const contentContainers = document.getElementsByClassName('content-container');
  let hasResults = false;
  contentBoxes.forEach((box, index) => {
    const content = removeSymbolsAndSpaces(box.textContent.toLowerCase());
    const boxContent = removeSymbolsAndSpaces(box.querySelector('.content').textContent.toLowerCase());
    if (content.includes(keyword) || boxContent.includes(keyword)) {
      box.style.display = 'flex';
      const parentElement = box.closest('.content-container');
      if (parentElement) {
        parentElement.style.flexDirection = 'column';
      }
      hasResults = true;
    } else {
      box.style.display = 'none';
      const parentElement = box.closest('.content-container');
      if (parentElement) {
        parentElement.style.flexDirection = 'row';
      }
    }
  });
  const resultCountElement = document.getElementById('resultCount');
  if (hasResults) {
    let resultCount = 0;
    contentBoxes.forEach((box) => {
      if (box.style.display === 'flex') {
        resultCount++;
      }
    });
    resultCountElement.textContent = resultCount;
  } else {
    resultCountElement.textContent = '0';
  }
  if (keyword.length === 0) {
    hasResults = false;
    contentContainers.forEach((container) => {
      container.style.flexDirection = initialFlexDirection;
    });
  }
}

function showAll() {
  const contentBoxes = document.getElementsByClassName('bordered');
  contentBoxes.forEach((box, index) => {
    box.style.display = initialDisplayStates[index];
  });
}

window.onload = function() {
  const contentBoxes = document.getElementsByClassName('bordered');
  for (let i = 0; i < contentBoxes.length; i++) {
    initialDisplayStates[i] = contentBoxes[i].style.display;
  }
  const parentElement = document.querySelector('.content-container');
  initialFlexDirection = window.getComputedStyle(parentElement).getPropertyValue('flex-direction');
};
