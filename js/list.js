function createPluginItem(packname, modpack) {
  const temp = `
  <div class="bordered">
      <div class="image-container" id="${packname}">
        <img src="${modpack.img}" alt="${packname}" width="200" height="200">
      </div>
      <div class="content" style="overflow: hidden;">
        <p id="pack-name"><strong>${packname}</strong></p>
        <p id="i18-version"><strong>最新汉化版本：<span>${modpack.i18version}</span></strong></p>
        <p id="g-version"></strong>游戏版本：<span>${modpack.gversion}</span></strong></p>
        <p id="i18-team"></strong>汉化成员：<span>${modpack.i18team}</span></strong></p>
      </div>
  </div>
  `;
  const doc = new DOMParser().parseFromString(temp, "text/html");
  const d = doc.querySelector(".content");
  if(modpack.isdownload){
      const item = document.createElement("p")
      item.id = "is-download";
      const a = document.createElement("span")
      a.textContent = "支持直链下载";
      item.appendChild(a)
      d.appendChild(item)
  }
  const links = document.createElement("div")
  links.className = "links";
  if(modpack["link"]["bilibili"]){
      const bilibili = new DOMParser().parseFromString(`<a href="https://space.bilibili.com/${modpack["link"]["bilibili"]}" target="_blank"><img src="/images/bilibili-line-blue.svg" alt="bilibili-line-blue" style="margin-bottom: -2px;" width="24px" height="24px"></a>`, "text/html");
      links.appendChild(bilibili.querySelector("a"))
  }
  if(modpack["link"]["curseforge"]){
      const curseforge = new DOMParser().parseFromString(`<a href="https://www.curseforge.com/minecraft/modpacks/${modpack["link"]["curseforge"]}" target="_blank"><img src="/images/curseforge.svg" alt="Curseforge" width="20" height="20"></a>`, "text/html");
      links.appendChild(curseforge.querySelector("a"))
  }
  if(modpack["link"]["mcmod"]){
      const mcmod = new DOMParser().parseFromString(`<a href="https://www.mcmod.cn/modpack/${modpack["link"]["mcmod"]}.html" target="_blank"><img src="/images/mcmod.svg" alt="mcmod" width="21px" height="21px" /></a>`, "text/html");
      links.appendChild(mcmod.querySelector("a"))
  }
  if(modpack["link"]["github"]){
      const github = new DOMParser().parseFromString(`<a href="https://github.com/${modpack["link"]["github"]}" target="_blank"><img src="/images/github-fill.svg" alt="github-fill" width="22px" height="22px"></a>`, "text/html");
      links.appendChild(github.querySelector("a"))
  }
  if(modpack["link"]["CFPAOrg"]){
      const CFPAOrg = new DOMParser().parseFromString(`<a href="https://cfpa.site/" target="_blank"><img src="/images/cfpa.svg" alt="cfpa" width="22" height="22"/></a>`, "text/html");
      links.appendChild(CFPAOrg.querySelector("a"))
  }
if (modpack["link"]["download"]) {
  const download = new DOMParser().parseFromString(
    `<a href="https://modpack.top/pro/${modpack["link"]["download"]}" download="${modpack["link"]["download"]}"><img src="/images/file-download-line.svg" alt="file-download-line" style="margin-bottom: -2px;" width="24px" height="24px"></a>`,
    "text/html"
  );
  links.appendChild(download.querySelector("a"));
}

  d.appendChild(links)
  document.querySelector(".content-container").appendChild(doc.querySelector(".bordered"));
}

function list(obj) {
  for (let i in obj) {
    createPluginItem(i, obj[i]);
  }
}


//当前从文件获取json数据后续可以直接从后端获取
$.ajax({
  url: "list.json",
  type: "GET",
  dataType: "json",
  success: function (data) {
    list(data);
  },
  error: function (xhr, status, error) {
    console.error("AJAX 请求错误：", error);
  }
});


