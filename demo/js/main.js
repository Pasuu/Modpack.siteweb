var htmltemp = new Object;  // 页面缓存
var modpacklisttemp;    // modpack列表缓存
var trmodpacklisttemp;  // 正在翻译modpack列表缓存
var nowpage = "index";  // 当前页面
const MAINAPIURL = "http://127.0.0.1:8000"; // 请求接口
var UUID;   // uuid

// 下载弹窗是否显示切换
function toggleDiv() {
    var downloadDiv = document.querySelector('.download-list');
    if (downloadDiv.style.display === "none") {
        downloadDiv.style.display = "block";
    } else {
        downloadDiv.style.display = "none";
    }
}

// 提交汉化显示切换
function toggleForm() {
    var modpack = document.querySelector('.upload-container .modpack');
    var translating = document.querySelector('.upload-container .translating');

    if (modpack.style.display === "none") {
        modpack.style.display = "block";
    } else {
        modpack.style.display = "none";
    }

    if (translating.style.display === "none") {
        translating.style.display = "block";
    } else {
        translating.style.display = "none";
    }
}

// 提交汉化
function uploadmodpack() {
    var uploadcontainer = document.querySelector('.upload-container');
    var modpack = document.querySelector('.upload-container .modpack');
    var translating = document.querySelector('.upload-container .translating');

    var imodpack = {
        useruuid:UUID,
        unix:new Date()/1,
        name:document.querySelector('[name="modpack-name"]').value,
        img:document.querySelector('[name="modpack-img"]').value,
        i18version:document.querySelector('[name="modpack-i18version"]').value,
        gversion:document.querySelector('[name="modpack-gversion"]').value,
        i18team:document.querySelector('[name="modpack-i18team"]').value,
        packurl:document.querySelector('[name="modpack-packurl"]').value
    };

    console.log(imodpack)

    document.querySelector('[name="modpack-name"]').value="";
    document.querySelector('[name="modpack-img"]').value="";
    document.querySelector('[name="modpack-i18version"]').value="";
    document.querySelector('[name="modpack-gversion"]').value="";
    document.querySelector('[name="modpack-i18team"]').value="";
    document.querySelector('[name="modpack-packurl"]').value="";
}

// GET请求方法
function netget(url,data) {
    var result;
    $.ajax({
        url : url,
        type : "GET",
        data : data,
        async : false,
        dataType: "text",
        success : function(data) {
            result = data;
        }
    });
    return result;
}

// POST请求方法
function netpost(url,data) {
    var result = false;
    $.ajax({
        url : url,
        type : "POST",
        data : data,
        async : false,
        success : function(data) {
            result = true;
        }
    });
    return result;
}

// 页面初始化
function initializing() {
    logo = `███╗   ███╗ ██████╗ ██████╗ ██████╗  █████╗  ██████╗██╗  ██╗\n████╗ ████║██╔═══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██║ ██╔╝\n██╔████╔██║██║   ██║██║  ██║██████╔╝███████║██║     █████╔╝ \n██║╚██╔╝██║██║   ██║██║  ██║██╔═══╝ ██╔══██║██║     ██╔═██╗ \n██║ ╚═╝ ██║╚██████╔╝██████╔╝██║     ██║  ██║╚██████╗██║  ██╗\n╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ `
    console.log(logo)
    stats()
    page(nowpage);
    document.querySelector(".leftmenu").innerHTML = getpage("leftmenu");

    for (i of document.querySelectorAll('.leftmenu span')) {
        i.addEventListener("click", (e) => {
            if(e.target.className == "page"){
                if (e.target.id) {
                    console.debug("切换页面: [" + e.target.id + "]");
                    page(e.target.id);
                }
            }
            if(e.target.className == "link"){
                if (e.target.id) {
                    console.debug("转到链接: [" + e.target.id + "]");
                    window.open(e.target.id);
                }
            }
        },);
    }
}

// 页面切换
function page(str) {
    document.querySelector("#app").innerHTML = "";
    document.querySelector("#app").innerHTML = getpage(str);
    nowpage = str;

    if (str == "modpack") {
        if(modpacklisttemp){
            modpacklist(modpacklisttemp)
        }else{
            modpacklisttemp = JSON.parse(netget(MAINAPIURL + "/modpacklist"));
            modpacklist(modpacklisttemp);
        }

        document.addEventListener("click", function(event) {
            var downloadDiv = document.querySelector('.download-list');
            var target = event.target;
            if(downloadDiv){
                if (target !== downloadDiv && !downloadDiv.contains(target)) {
                    downloadDiv.style.display = "none";
                }
            }
        });
        
        /*  匹配数量初始化（废弃）
        var contentBoxes = document.getElementsByClassName('bordered');

        for (var i = 0; i < contentBoxes.length; i++) {
        initialDisplayStates[i] = contentBoxes[i].style.display;
        }

        var parentElement = document.querySelector('.content-container');
        initialFlexDirection = window.getComputedStyle(parentElement).getPropertyValue('flex-direction');
        */
    }

    if(str == "index"){
        try {
            var typed = new Typed("#subtitle", {
                strings: ['这里是我的世界整合包汉化收集网站', '旨在收集各种汉化内容'],
                startDelay: 0,
                typeSpeed: 135,
                loop: true,
                backSpeed: 40,
                showCursor: true
            });
        } catch (err) {
            console.log(err);
        }
    }

    if(str=="translating"){
        if(trmodpacklisttemp){
            modpacklist(trmodpacklisttemp)
        }else{
            trmodpacklisttemp = JSON.parse(netget(MAINAPIURL + "/trmodpacklist"));
            modpacklist(trmodpacklisttemp);
        }
    }
}

// 获取页面内容
function getpage(str) {
    if (htmltemp[str]) {
        return htmltemp[str];
    } else {
        htmltemp[str] = netget("./page/" + str + ".xml");
        return htmltemp[str];
    }
}

window.onload = function () { initializing(); };