if (window.mermaid) {
  mermaid.initialize({ theme: "forest" });
}

window.addEventListener('DOMContentLoaded', function() {
setTimeout(function() {
  var imageContainers = document.getElementsByClassName('image-container');
  var countImageContainers = imageContainers.length;
  
  var countElement = document.getElementById('count');
  countElement.textContent = countImageContainers;
}, 1500);
}); /* 计数 */


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
}  /* 搜索 */

document.addEventListener("click", function(event) {
  const target = event.target;

  if (target.matches(".mess img")) {
      const commentWidget = document.querySelector(".comment-widget"); 

      if (!commentWidget) {
          console.error("评论窗口元素未找到！");
          return;
      }

      const isDisplayed = commentWidget.style.display !== "none";

      if (!isDisplayed) {
          commentWidget.style.display = "block";
      } else {
          commentWidget.style.display = "none";
      }
  }
}); /* 评论*/


document.addEventListener("DOMContentLoaded", function() {
  var backButton = document.getElementById("totop");


  backButton.addEventListener("click", function() {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
  });
}); /* 回到顶部 */


document.addEventListener("DOMContentLoaded", function() {
  var icons = document.querySelectorAll(".juan");
  var image = document.getElementById("myImage");

  image.style.display = "none";

  for (var icon of icons) {
    icon.addEventListener("click", function() {
      image.style.display = "flex";
    });
  }

  document.addEventListener("click", function(event) {
    var target = event.target;
    if (target !== image && !image.contains(target)) {
      image.style.display = "none";
    }
  });
});
