
var BootDate = new Date("2023-07-02");


function ShowRunTime(id) {
    var NowDate = new Date();
    var RunDateM = parseInt(NowDate - BootDate);
    var RunDays = Math.floor(RunDateM / (24 * 3600 * 1000));
    var RunHours = Math.floor(RunDateM % (24 * 3600 * 1000) / (3600 * 1000));
    var RunMinutes = Math.floor(RunDateM % (24 * 3600 * 1000) % (3600 * 1000) / (60 * 1000));
    var RunSeconds = Math.round(RunDateM % (24 * 3600 * 1000) % (3600 * 1000) % (60 * 1000) / 1000);
    var days = RunDays + "天" + RunHours + "时" + RunMinutes + "分" + RunSeconds + "秒";
    

    var element = document.getElementById(id);
    if (element) {
        element.innerHTML = days;
    } else {
        console.error("Element with id '" + id + "' not found.");
    }
}


document.addEventListener('DOMContentLoaded', function() {
    ShowRunTime('days');

    setInterval(function() {
        ShowRunTime('days');
    }, 1000);
});


    fetch('/modpacks.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('modpackCount').textContent = `已收录${Object.keys(data).length}个汉化包.`;
      })
      .catch(error => {
        console.error('Error loading modpacks:', error);
        document.getElementById('modpackCount').textContent = '加载失败';
      });