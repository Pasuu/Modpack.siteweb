var s0 = '2023-07-02';
s1 = new Date(s0.replace(/-/g, "/"));
s2 = new Date();
var days = s2.getTime() - s1.getTime();

var BootDate = new Date("2023-07-02");
function ShowRunTime(id) {
  var NowDate = new Date();
  var RunDateM = parseInt(NowDate - BootDate);
  var RunDays = Math.floor(RunDateM / (24 * 3600 * 1000));
  var RunHours = Math.floor(RunDateM % (24 * 3600 * 1000) / (3600 * 1000));
  var RunMinutes = Math.floor(RunDateM % (24 * 3600 * 1000) % (3600 * 1000) / (60 * 1000));
  var RunSeconds = Math.round(RunDateM % (24 * 3600 * 1000) % (3600 * 1000) % (60 * 1000) / 1000);
  var days = RunDays + "天" + RunHours + "时" + RunMinutes + "分" + RunSeconds + "秒";
  document.getElementById(id).innerHTML = days;
}
ShowRunTime('days');
setInterval(function() {
  ShowRunTime('days');
}, 1000); /* 计时 */