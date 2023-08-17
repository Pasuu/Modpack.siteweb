document.addEventListener('DOMContentLoaded', function() {
  // 获取所有带有 .download-link 类的下载链接元素
  const downloadLinks = document.querySelectorAll('.download-link');
  
  // 获取用于显示下载量的元素
  const downloadCountElements = document.querySelectorAll('.download-count');
  
  // 创建一个对象来保存下载量信息
  const downloadCounts = {};

  // 初始化下载量为 0，每个下载链接对应一个独立的下载量
  downloadLinks.forEach((link, index) => {
    const filename = link.getAttribute('href'); // 使用链接作为标识
    downloadCounts[filename] = 0;
    link.addEventListener('click', function(event) {
      event.preventDefault();
      downloadCounts[filename]++;
      // 更新对应下载量的显示
      downloadCountElements[index].textContent = downloadCounts[filename];
    });
  });
});
