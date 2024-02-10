messElement.addEventListener("click", function() {
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
});
