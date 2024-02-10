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
}); /* 评论 */