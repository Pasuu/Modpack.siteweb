// 获取下载统计数据
function getdownloadstats(n, v) {
    url = MAINAPIURL + "/stats/get?n=" + n + "-" + v;
    output = netget(url)
    console.debug("获取下载统计数据: " + "[" + n + " v" + v + "] " + output + "次");
    return output;
}

// 上传下载统计数据
function postdownloadstats(n, v) {
    url = MAINAPIURL + "/stats/upload?n=" + n + "-" + v;

    if (netpost(url)) {
        console.debug("下载统计数据上传成功: " + "[" + n + " v" + v + "]");
    } else {
        console.debug("下载统计数据上传失败: " + "[" + n + " v" + v + "]");
    }
}

// 生成uuid&读取本地uuid
function stats(){
    if(window.localStorage.getItem("modpack-uuid")){
        UUID = window.localStorage.getItem("modpack-uuid");
        console.debug("UUID: ["+UUID+"]");
    }else{
        window.localStorage.setItem("UUIDmodpack-uuid", getuuid());
        UUID = window.localStorage.getItem("modpack-uuid");
        console.debug("生成UUID: ["+UUID+"]");
    }
}

// 获取uuid
function getuuid() {
    if (typeof crypto === 'object') {
      if (typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
      if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
        const callback = (c) => {
          const num = Number(c);
          return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
        };
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, callback);
      }
    }
    let timestamp = new Date().getTime();
    let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let random = Math.random() * 16;
      if (timestamp > 0) {
        random = (timestamp + random) % 16 | 0;
        timestamp = Math.floor(timestamp / 16);
      } else {
        random = (perforNow + random) % 16 | 0;
        perforNow = Math.floor(perforNow / 16);
      }
      return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
    });
};