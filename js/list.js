let modpackCounter = 0;
let currentContainer;

function createPluginItem(packname, modpack) {
  if (modpackCounter % 2 === 0) {
    currentContainer = document.createElement("div");
    currentContainer.className = "content-container";
    document.querySelector(".main-container").appendChild(currentContainer);
  }

  const temp = `
  <div class="bordered">
      <div class="image-container" id="${packname}">
        <img src="${modpack.img}" alt="${packname}" width="200" height="200">
      </div>
      <div class="content" style="overflow: hidden;">
        <p id="pack-name"><strong>${packname}</strong></p>
        <p id="i18-version"><strong>最新汉化版本：<span style="color: rgb(17, 165, 133);">${modpack.i18version}</span></strong></p>
        <p id="g-version"><strong>游戏版本：<span style="color: rgba(12, 64, 206, 0.8);">${modpack.gversion}</span></strong></p>
        <p id="i18-team"><strong>汉化成员：<span style="color: rgb(110, 35, 231);">${modpack.i18team}</span></strong></p>
      </div>
  </div>
  `;
  const doc = new DOMParser().parseFromString(temp, "text/html");
  const modpackDiv = doc.querySelector(".bordered");
  const d = doc.querySelector(".content");

  if (modpack.isdownload) {
    const item = document.createElement("p");
    item.id = "is-download";
    const a = document.createElement("span");
    a.textContent = "支持直链下载";
    a.style.color = "rgb(255, 0, 0)";
    item.appendChild(a);
    d.appendChild(item);
  }

  const links = document.createElement("div");
  links.className = "links";
  if (modpack["link"]["bilibili"]) {
    const bilibili = new DOMParser().parseFromString(`<a href="https://space.bilibili.com/${modpack["link"]["bilibili"]}" target="_blank"><img src="/images/bilibili-line-blue.svg" alt="bilibili-line-blue" style="margin-bottom: -2px;" width="24px" height="24px"></a>`, "text/html");
    bilibili.querySelector("a").style.marginRight = "1px";
    links.appendChild(bilibili.querySelector("a"));
  }
  if (modpack["link"]["curseforge"]) {
    const curseforge = new DOMParser().parseFromString(`<a href="https://www.curseforge.com/minecraft/modpacks/${modpack["link"]["curseforge"]}" target="_blank"><img src="/images/curseforge.svg" alt="Curseforge" width="20" height="20"></a>`, "text/html");
    curseforge.querySelector("a").style.marginRight = "3px";
    links.appendChild(curseforge.querySelector("a"));
  }
  if (modpack["link"]["ftb"]) {
    const ftb = new DOMParser().parseFromString(`<a href="https://feed-the-beast.com/modpacks/${modpack["link"]["ftb"]}" target="_blank"><img src="/images/ftb.svg" alt="feed-the-beast" width="32px" height="20px"></a>`, "text/html");
    ftb.querySelector("a").style.marginRight = "3px";
    links.appendChild(ftb.querySelector("a"));
  }
  if (modpack["link"]["modrinth"]) {
    const modrinth = new DOMParser().parseFromString(`<a href="https://modrinth.com/modpack/${modpack["link"]["modrinth"]}" target="_blank"><img src="/images/modrinth.svg" alt="modrinth" width="20px" height="20px"></a>`, "text/html");
    modrinth.querySelector("a").style.marginRight = "3px";
    links.appendChild(modrinth.querySelector("a"));
  }
  if (modpack["link"]["mcmod"]) {
    const mcmod = new DOMParser().parseFromString(`<a href="https://www.mcmod.cn/modpack/${modpack["link"]["mcmod"]}.html" target="_blank"><img src="/images/mcmod.svg" alt="mcmod" width="21px" height="21px" /></a>`, "text/html");
    mcmod.querySelector("a").style.marginRight = "1px";
    links.appendChild(mcmod.querySelector("a"));
  }
  if (modpack["link"]["github"]) {
    const github = new DOMParser().parseFromString(`<a href="https://github.com/${modpack["link"]["github"]}" target="_blank"><img src="/images/github-fill.svg" alt="github-fill" width="22px" height="22px"></a>`, "text/html");
    github.querySelector("a").style.marginRight = "-1px";
    links.appendChild(github.querySelector("a"));
  }
  if (modpack["link"]["gtnh"]) {
    const gtnh = new DOMParser().parseFromString(`<a href="https://gtnh.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5" target="_blank"><img src="/images/gtnh.svg" alt="gtnh" width="28" height="28"/></a>`, "text/html");
    gtnh.querySelector("a").style.marginLeft = "1px";
    links.appendChild(gtnh.querySelector("a"));
  }
  if (modpack["link"]["anyijun"]) {
    const anyijun = new DOMParser().parseFromString(`<a href="https://anyijun.com/" target="_blank"><img src="/images/anyijun.svg" alt="anyijun" width="22" height="22"/></a>`, "text/html");
    anyijun.querySelector("a").style.marginLeft = "1px";
    links.appendChild(anyijun.querySelector("a"));
  }
  if (modpack["link"]["download1"]) {
    const download1 = new DOMParser().parseFromString(
      `<a href="https://modpack.top/pro/${modpack["link"]["download1"]}" download="${modpack["link"]["download1"]}"><img src="/images/file-download-line.svg" alt="file-download-line" style="margin-bottom: -2px;" width="24px" height="24px"></a>`,
      "text/html"
    );
    download1.querySelector("a").style.marginRight = "-1px";
    links.appendChild(download1.querySelector("a"));
  }
  if (modpack["link"]["CFPAOrg"]) {
    const CFPAOrg = new DOMParser().parseFromString(`<a href="https://cfpa.site/" target="_blank"><img src="/images/cfpa.svg" alt="cfpa" width="22" height="22"/></a>`, "text/html");
    CFPAOrg.querySelector("a").style.marginRight = "1px";
    links.appendChild(CFPAOrg.querySelector("a"));
  }
  if (modpack["link"]["VM"]) {
    const VM = new DOMParser().parseFromString(`<a href="https://vmct-cn.top/${modpack["link"]["VM"]}" target="_blank"><img src="/images/vm.svg" alt="vm" width="32.2" height="23"/></a>`, "text/html");
    VM.querySelector("a").style.marginRight = "1px";
    links.appendChild(VM.querySelector("a"));
  }
  if (modpack["link"]["VM0"]) {
    const VM0 = new DOMParser().parseFromString(`<a href="https://vmct-cn.top/" target="_blank"><img src="/images/vm.svg" alt="vm" width="32.2" height="23"/></a>`, "text/html");
    VM0.querySelector("a").style.marginRight = "1px";
    links.appendChild(VM0.querySelector("a"));
  }
  if (modpack["link"]["download"]) {
    const download = new DOMParser().parseFromString(
      `<a href="https://modpack.top/pro/${modpack["link"]["download"]}" download="${modpack["link"]["download"]}"><img src="/images/file-download-line.svg" alt="file-download-line" style="margin-bottom: -2px;" width="24px" height="24px"></a>`,
      "text/html"
    );
    download.querySelector("a").style.marginRight = "-1px";
    links.appendChild(download.querySelector("a"));
  }
  if (modpack["link"]["baidupan"]) {
    const baidupan = new DOMParser().parseFromString(`<a href="https://pan.baidu.com/s/${modpack["link"]["baidupan"]}" target="_blank"><img src="/images/baiduyun.svg" alt="baiduyun" width="24" height="24"/></a>`, "text/html");
    baidupan.querySelector("a").style.marginRight = "1px";
    links.appendChild(baidupan.querySelector("a"));
  }
  if (modpack["link"]["download0"]) {
    const download0 = new DOMParser().parseFromString(
      `<a href="https://modpack.top/pro/${modpack["link"]["download0"]}" download="${modpack["link"]["download0"]}"><img src="/images/file-download-line.svg" alt="file-download-line" style="margin-bottom: -2px;" width="24px" height="24px"></a>`,
      "text/html"
    );
    download0.querySelector("a").style.marginRight = "-1px";
    links.appendChild(download0.querySelector("a"));
  }
  if (modpack["link"]["bilibilidwyellow"]) {
    const bilibilidwyellow = new DOMParser().parseFromString(`<a href="https://www.bilibili.com/read/${modpack["link"]["bilibilidwyellow"]}" target="_blank"><img src="/images/bilibili-line-yellow.svg" alt="bilibili-line-yellow" style="margin-bottom: -2px;" width="24px" height="24px"></a>`, "text/html");
    bilibilidwyellow.querySelector("a").style.marginRight = "1px";
    links.appendChild(bilibilidwyellow.querySelector("a"));
  }
  if (modpack["link"]["bilibilidwred"]) {
    const bilibilidwred = new DOMParser().parseFromString(`<a href="https://www.bilibili.com/read/${modpack["link"]["bilibilidwred"]}" target="_blank"><img src="/images/bilibili-line-red.svg" alt="bilibili-line-red" style="margin-bottom: -2px;" width="24px" height="24px"></a>`, "text/html");
    bilibilidwred.querySelector("a").style.marginRight = "1px";
    links.appendChild(bilibilidwred.querySelector("a"));
  }
  if (modpack["link"]["bilibilidwvideo"]) {
    const bilibilidwvideo = new DOMParser().parseFromString(`<a href="https://www.bilibili.com/video/${modpack["link"]["bilibilidwvideo"]}" target="_blank"><img src="/images/bilibili-line-red.svg" alt="bilibili-line-red" style="margin-bottom: -2px;" width="24px" height="24px"></a>`, "text/html");
    bilibilidwvideo.querySelector("a").style.marginRight = "1px";
    links.appendChild(bilibilidwvideo.querySelector("a"));
  }
d.appendChild(links);
currentContainer.appendChild(modpackDiv);
modpackCounter++;

if (modpackCounter % 2 === 0) {
  currentContainer = null;
}
}

function list(obj) {
for (let i in obj) {
  createPluginItem(i, obj[i]);
}
}

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


