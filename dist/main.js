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

const messElement = document.getElementById("mess");
  const commentWidget = document.querySelector(".comment-widget");

  messElement.addEventListener("click", function() {
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
  }); /* 评论*/

new Valine({
  el: '#vcomments',
  appId: 'DlSdat6GR1UJu77SbVGkztvU-gzGzoHsz',
  appKey: 'B5tuP0Tud3yyWvU2zWSCG0dR'
})