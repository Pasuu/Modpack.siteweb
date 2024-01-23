function createPluginItem(packname, modpack) {
    const temp = `
    <div class="bordered">
        <div class="image-container" id="${packname}">
          <img src="${modpack.img}" alt="${packname}" width="200" height="200">
        </div>
        <div class="content" style="overflow: hidden;">
          <p id="pack-name">${packname}</p>
          <p id="i18-version">最新汉化版本：<span>${modpack.i18version}</span></p>
          <p id="g-version">游戏版本：<span>${modpack.gversion}</span></p>
          <p id="i18-team">汉化成员：<span>${modpack.i18team}</span></p>
        </div>
    </div>
    `;
    const doc = new DOMParser().parseFromString(temp, "text/html");
    const d = doc.querySelector(".content");
    if (modpack["download"]) {
        const item = document.createElement("p");
        item.id = "is-download";
        const a = document.createElement("span");
        a.textContent = "支持直链下载";
        item.appendChild(a);
        d.appendChild(item);
    }
    if (modpack["info"]) {
        const item = document.createElement("p");
        item.id = "info";
        const a = document.createElement("span");
        a.textContent = modpack["info"];
        item.appendChild(a);
        d.appendChild(item);
    }
    const links = document.createElement("div")
    links.className = "links";
    if (modpack["link"]["bilibili"]) {
        const bilibili = new DOMParser().parseFromString(`<a title="哔哩哔哩" href="https://space.bilibili.com/${modpack["link"]["bilibili"]}" target="_blank"><img src="/images/bilibili-line-blue.svg" alt="bilibili-line-blue" style="margin-bottom: -2px;" width="24px" height="24px"></a>`, "text/html");
        bilibili.querySelector("a").style.marginRight = "1px";
        links.appendChild(bilibili.querySelector("a"));
    }
    if (modpack["link"]["curseforge"]) {
        const curseforge = new DOMParser().parseFromString(`<a title="COURSEFORGE" href="https://www.curseforge.com/minecraft/modpacks/${modpack["link"]["curseforge"]}" target="_blank"><img src="/images/curseforge.svg" alt="Curseforge" width="20" height="20"></a>`, "text/html");
        curseforge.querySelector("a").style.marginRight = "3px";
        links.appendChild(curseforge.querySelector("a"));
    }
    if (modpack["link"]["ftb"]) {
        const ftb = new DOMParser().parseFromString(`<a title="FTBteam" href="https://feed-the-beast.com/modpacks/${modpack["link"]["ftb"]}" target="_blank"><img src="/images/ftb.svg" alt="feed-the-beast" width="32px" height="20px"></a>`, "text/html");
        ftb.querySelector("a").style.marginRight = "3px";
        links.appendChild(ftb.querySelector("a"));
    }
    if (modpack["link"]["modrinth"]) {
        const modrinth = new DOMParser().parseFromString(`<a title="MODRINTH" href="https://modrinth.com/modpack/${modpack["link"]["modrinth"]}" target="_blank"><img src="/images/modrinth.svg" alt="modrinth" width="20px" height="20px"></a>`, "text/html");
        modrinth.querySelector("a").style.marginRight = "3px";
        links.appendChild(modrinth.querySelector("a"));
    }
    if (modpack["link"]["mcmod"]) {
        const mcmod = new DOMParser().parseFromString(`<a title="MCMOD" href="https://www.mcmod.cn/modpack/${modpack["link"]["mcmod"]}.html" target="_blank"><img src="/images/mcmod.png" alt="mcmod" width="21px" height="21px" /></a>`, "text/html");
        mcmod.querySelector("a").style.marginRight = "1px";
        links.appendChild(mcmod.querySelector("a"));
    }
    if (modpack["link"]["github"]) {
        const github = new DOMParser().parseFromString(`<a title="GITHUB" href="https://github.com/${modpack["link"]["github"]}" target="_blank"><img src="/images/github-fill.svg" alt="github-fill" width="22px" height="22px"></a>`, "text/html");
        github.querySelector("a").style.marginRight = "-1px";
        links.appendChild(github.querySelector("a"));
    }
    if (modpack["link"]["gtnh"]) {
        const gtnh = new DOMParser().parseFromString(`<a title="GTNH" href="https://gtnh.huijiwiki.com/wiki/%E9%A6%96%E9%A1%B5" target="_blank"><img src="/images/gtnh.svg" alt="gtnh" width="28" height="28"/></a>`, "text/html");
        gtnh.querySelector("a").style.marginLeft = "1px";
        links.appendChild(gtnh.querySelector("a"));
    }
    if (modpack["link"]["anyijun"]) {
        const anyijun = new DOMParser().parseFromString(`<a title="安逸汉化组" href="https://anyijun.com/" target="_blank"><img src="/images/anyijun.svg" alt="anyijun" width="22" height="22"/></a>`, "text/html");
        anyijun.querySelector("a").style.marginLeft = "1px";
        links.appendChild(anyijun.querySelector("a"));
    }
    if (modpack["link"]["CFPAOrg"]) {
        const CFPAOrg = new DOMParser().parseFromString(`<a title="CFPAorg" href="https://cfpa.site/" target="_blank"><img src="/images/cfpa.svg" alt="cfpa" width="22" height="22"/></a>`, "text/html");
        CFPAOrg.querySelector("a").style.marginRight = "1px";
        links.appendChild(CFPAOrg.querySelector("a"));
    }
    if (modpack["link"]["VM"]) {
        const VM = new DOMParser().parseFromString(`<a title="VM汉化组" href="https://vmct-cn.top/${modpack["link"]["VM"]}" target="_blank"><img src="/images/vm.svg" alt="vm" width="32.2" height="23"/></a>`, "text/html");
        VM.querySelector("a").style.marginRight = "1px";
        links.appendChild(VM.querySelector("a"));
    }
    if (modpack["link"]["VM0"]) {
        const VM0 = new DOMParser().parseFromString(`<a title="VM汉化组" href="https://vmct-cn.top/" target="_blank"><img src="/images/vm.svg" alt="vm" width="32.2" height="23"/></a>`, "text/html");
        VM0.querySelector("a").style.marginRight = "1px";
        links.appendChild(VM0.querySelector("a"));
    }
    if (modpack["link"]["baidupan"]) {
        const baidupan = new DOMParser().parseFromString(`<a title="百度网盘" href="https://pan.baidu.com/s/${modpack["link"]["baidupan"]}" target="_blank"><img src="/images/baiduyun.svg" alt="baiduyun" width="24" height="24"/></a>`, "text/html");
        baidupan.querySelector("a").style.marginRight = "1px";
        links.appendChild(baidupan.querySelector("a"));
    }
    if (modpack["link"]["bilibilidwyellow"]) {
        const bilibilidwyellow = new DOMParser().parseFromString(`<a title="哔哩哔哩专栏" href="https://www.bilibili.com/read/${modpack["link"]["bilibilidwyellow"]}" target="_blank"><img src="/images/bilibili-line-yellow.svg" alt="bilibili-line-yellow" style="margin-bottom: -2px;" width="24px" height="24px"></a>`, "text/html");
        bilibilidwyellow.querySelector("a").style.marginRight = "1px";
        links.appendChild(bilibilidwyellow.querySelector("a"));
    }
    if (modpack["link"]["bilibilidwred"]) {
        const bilibilidwred = new DOMParser().parseFromString(`<a title="哔哩哔哩专栏" href="https://www.bilibili.com/read/${modpack["link"]["bilibilidwred"]}" target="_blank"><img src="/images/bilibili-line-red.svg" alt="bilibili-line-red" style="margin-bottom: -2px;" width="24px" height="24px"></a>`, "text/html");
        bilibilidwred.querySelector("a").style.marginRight = "1px";
        links.appendChild(bilibilidwred.querySelector("a"));
    }
    if (modpack["link"]["bilibilidwvideo"]) {
        const bilibilidwvideo = new DOMParser().parseFromString(`<a title="哔哩哔哩视频" href="https://www.bilibili.com/video/${modpack["link"]["bilibilidwvideo"]}" target="_blank"><img src="/images/bilibili-line-red.svg" alt="bilibili-line-red" style="margin-bottom: -2px;" width="24px" height="24px"></a>`, "text/html");
        bilibilidwvideo.querySelector("a").style.marginRight = "1px";
        links.appendChild(bilibilidwvideo.querySelector("a"));
    }

    if (modpack["download"]) {
        const download = new DOMParser().parseFromString(`<a title="下载" href="javascript:void(0)"><div class="bilibili" style="display: inline-block;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="margin-bottom: -2px;"><path d="M13 12H16L12 16L8 12H11V8H13V12ZM15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z"></path></svg></div></a>`, "text/html");
        download.querySelector("a").addEventListener("click", (event) => { event.stopPropagation(); opendownloadmodpack(packname, modpack); },);
        links.appendChild(download.querySelector("a"));
    }
    if (modpack["link"]["download0"]) {
        const download0 = new DOMParser().parseFromString(
            `<a title="下载" href="https://modpack.top/pro/${modpack["link"]["download0"]}" download="${modpack["link"]["download0"]}"><img src="/images/file-download-line.svg" alt="file-download-line" style="margin-bottom: -2px;" width="24px" height="24px"></a>`,
            "text/html"
        );
        download0.querySelector("a").style.marginRight = "-1px";
        links.appendChild(download0.querySelector("a"));
    }
    if (modpack["link"]["download1"]) {
        const download1 = new DOMParser().parseFromString(
            `<a title="下载" href="https://modpack.top/pro/${modpack["link"]["download1"]}" download="${modpack["link"]["download1"]}"><img src="/images/file-download-line.svg" alt="file-download-line" style="margin-bottom: -2px;" width="24px" height="24px"></a>`,
            "text/html"
        );
        download1.querySelector("a").style.marginRight = "-1px";
        links.appendChild(download1.querySelector("a"));
    }
    if (modpack["link"]["download"]) {
        const download = new DOMParser().parseFromString(`<a title="下载" href="javascript:void(0)"><div class="bilibili" style="display: inline-block;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="margin-bottom: -2px;"><path d="M13 12H16L12 16L8 12H11V8H13V12ZM15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z"></path></svg></div></a>`, "text/html");
        download.querySelector("a").addEventListener("click", (event) => { event.stopPropagation(); opendownloadmodpackold(packname, modpack); },);
        links.appendChild(download.querySelector("a"));
    }
    d.appendChild(links)
    document.querySelector(".content-container").appendChild(doc.querySelector(".bordered"));
}

function opendownloadmodpack(packname, modpack) {
    console.debug("下载弹窗: [" + packname + "]", modpack)
    document.querySelector(".download-list h2").textContent = packname;
    const table = document.querySelector(".table tbody");
    table.innerHTML = "";
    for (i in modpack["download"]) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.textContent = i;
        tr.appendChild(td);
        for (j = 0; j < modpack["download"][i].length - 1; j++) {
            if (j == 1) {
                const td = document.createElement("td");
                td.textContent = getdownloadstats(packname, i);
                tr.appendChild(td);
            } else {
                const td = document.createElement("td");
                td.textContent = modpack["download"][i][j];
                tr.appendChild(td);
            }
        }
        const tdd = document.createElement("td");
        const a = document.createElement("a");
        a.textContent = "点击下载"
        a.href = "javascript:void(0)"
        a.addEventListener("click", () => { downloadmodpack(packname, i, modpack["download"][i][modpack["download"][i].length - 1]) },);
        tdd.appendChild(a);
        tr.appendChild(tdd);
        table.appendChild(tr);
    }
    toggleDiv();
}

function opendownloadmodpackold(packname, modpack) {
    console.debug("下载弹窗: [" + packname + "]", modpack)
    document.querySelector(".download-list h2").textContent = packname;
    const table = document.querySelector(".table tbody");
    table.innerHTML = "";

    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = modpack["i18version"]
    tr.appendChild(td);
    for (j = 0; j < 3; j++) {
        if (j == 1) {
            const td = document.createElement("td");
            td.textContent = getdownloadstats(packname, modpack["i18version"]);
            tr.appendChild(td);
        } else {
            const td = document.createElement("td");
            td.textContent = "-";
            tr.appendChild(td);
        }
    }
    const tdd = document.createElement("td");
    const a = document.createElement("a");
    a.textContent = "点击下载"
    a.href = "javascript:void(0)"
    var l = "https://modpack.top/pro/" + modpack["link"]["download"]
    a.addEventListener("click", () => { downloadmodpack(packname, modpack["i18version"], l) },);
    tdd.appendChild(a);
    tr.appendChild(tdd);
    table.appendChild(tr);

    toggleDiv()
}

function downloadmodpack(n, v, l) {
    postdownloadstats(n, v);
    window.location.href = l;
}

function modpacklist(obj) {
    for (i in obj) {
        createPluginItem(i, obj[i]);
    }

    if (nowpage == "modpack") {
        var resultCountElement = document.getElementById('resultCountS');
        resultCountElement.textContent = document.getElementsByClassName('bordered').length;
    }

    var resultCountElement = document.getElementById('resultCount');
    resultCountElement.textContent = document.getElementsByClassName('bordered').length;
}