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

 /* 搜索 */

document.addEventListener("click", function(event) {
  const target = event.target;

  if (target.matches(".mess img")) {
      const commentWidget = document.querySelector(".comment-widget"); 

      if (!commentWidget) {
          console.error("评论窗口元素未找到！");
          return;
      }

      const computedStyle = window.getComputedStyle(commentWidget);
      const display = computedStyle.getPropertyValue("display");
    
      if (display === "none") {
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

document.addEventListener("click", function(event) {
  const target = event.target;

  if (target.matches(".juan img")) {
      const juantu = document.querySelector(".juantu"); 

      if (!juantu) {
          console.error("图片未找到");
          return;
      }

      const computedStyle = window.getComputedStyle(juantu);
      const display = computedStyle.getPropertyValue("display");
    
      if (display === "none") {
        juantu.style.display = "block";
      } else {
        juantu.style.display = "none";
      }
  }
}); /* 捐赠 */

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?1eb579bfd5bf16e21a7dff4310aa4069";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})(); /* 百度统计 */