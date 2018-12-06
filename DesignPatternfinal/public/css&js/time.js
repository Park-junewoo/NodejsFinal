window.onload = function() {
  setInterval(function() {
    var d = new Date();
    var week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
    var target = document.getElementsByName("dt_now")[0];
              target.value = (d.getFullYear()+". " + (d.getMonth() + 1) +". "+d.getDate()+". "+week[d.getDay()]+"  "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
  }, 1);
}
