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
    const links = document.createElement("div")
    links.className = "links";
    if (modpack["link"]["bilibili"]) {
        const bilibili = new DOMParser().parseFromString(`<a href="https://space.bilibili.com/${modpack["link"]["bilibili"]}" target="_blank"><img src="/images/bilibili-line-blue.svg" alt="bilibili-line-blue" style="margin-bottom: -2px;" width="24px" height="24px"></a>`, "text/html");
        links.appendChild(bilibili.querySelector("a"));
    }
    if (modpack["link"]["curseforge"]) {
        const curseforge = new DOMParser().parseFromString(`<a href="https://www.curseforge.com/minecraft/modpacks/${modpack["link"]["curseforge"]}" target="_blank"><img src="https://wmimg.com/i/47/2023/08/64dcc915eca08.webp" alt="Curseforge" width="20" height="20"></a>`, "text/html");
        links.appendChild(curseforge.querySelector("a"));
    }
    if (modpack["link"]["mcmod"]) {
        const mcmod = new DOMParser().parseFromString(`<a href="https://www.mcmod.cn/modpack/${modpack["link"]["mcmod"]}.html" target="_blank"><img src="https://wmimg.com/i/47/2023/08/64dcc91aeece6.webp" alt="mcmod" width="21px" height="21px"></a>`, "text/html");
        links.appendChild(mcmod.querySelector("a"));
    }
    if (modpack["link"]["github"]) {
        const github = new DOMParser().parseFromString(`<a href="https://github.com/${modpack["link"]["github"]}" target="_blank"><img src="https://wmimg.com/i/47/2023/08/64dcc91aeebdb.webp" alt="Github" width="22" height="22"></a>`, "text/html");
        links.appendChild(github.querySelector("a"));
    }
    if (modpack["link"]["CFPAOrg"]) {
        const CFPAOrg = new DOMParser().parseFromString(`<a href="https://cfpa.site/" target="_blank"><img src="https://wmimg.com/i/47/2023/08/64dcc9160a13d.webp" alt="cfpa" width="22" height="22"></a>`, "text/html");
        links.appendChild(CFPAOrg.querySelector("a"));
    }
    if (modpack["download"]) {
        const download = new DOMParser().parseFromString(`<a href="javascript:void(0)"><div class="bilibili" style="display: inline-block;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="margin-bottom: -2px;"><path d="M13 12H16L12 16L8 12H11V8H13V12ZM15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z"></path></svg></div></a>`, "text/html");
        download.querySelector("a").addEventListener("click", () => { opendownloadmodpack(packname, modpack) },);
        links.appendChild(download.querySelector("a"));
    }
    d.appendChild(links)
    document.querySelector(".content-container").appendChild(doc.querySelector(".bordered"));
}

function opendownloadmodpack(packname, modpack) {
    console.log(packname, modpack)
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
                td.textContent = getdownloadstats(packname,i);
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
        a.addEventListener("click", () => { downloadmodpack(packname,i,modpack["download"][i][modpack["download"][i].length - 1]) },);
        tdd.appendChild(a);
        tr.appendChild(tdd);
        table.appendChild(tr);
    }
    popDiv()
}

function downloadmodpack(n,v,l) {
    postgetdownloadstats(n, v);
    window.location.href = "https://modpack.top/pro/" + l;
}

function list(obj) {
    for (i in obj) {
        createPluginItem(i, obj[i]);
    }
    var resultCountElement = document.getElementById('resultCount');
    resultCountElement.textContent = document.getElementsByClassName('bordered').length;
}

function getdownloadstats(n,v) {
    url = "http://modpack.top/stats/get?n=" + n + "-" + v;
    var result;
    $.ajax({
        url: url,
        type: "GET",
        data: {},
        async: false,
        success: function (data) {
            result = data;
        }
    });
    return result;
}

function postgetdownloadstats(n, v) {
    url = "http://modpack.top/stats/upload?n=" + n + "-" + v;
    $.ajax({
        url: url,
        type: "POST",
        data: {},
        async: false,
        success: function (data) {
            console.log("upload success");
        }
    });
}


$.ajax({
    url: "bz.json",
    type: "GET",
    dataType: "json",
    success:
        function (data) {
            list(data)
        }
});