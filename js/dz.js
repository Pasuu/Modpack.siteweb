const isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  }
};

function dz() {
  function n(n, e, t) {
    return n.getAttribute(e) || t;
  }

  function e(n) {
    return document.getElementsByTagName(n);
  }

   // 根据设备类型设置粒子数量
  var count = isMobile.any() ? 60 : 150;

  function t() {
    var t = e("script"),
      o = t.length,
      i = t[o - 1];
    return {
      l: o,
      z: n(i, "zIndex", -1),
      o: n(i, "opacity", 0.5),
      c: n(i, "color", "241 156 0"),
      count: count, // 将粒子数量修改为 count 的值
      pointSize: 1,
    };
  }

  function o() {
    a = (m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
    c = (m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
  }

  function i() {
    r.clearRect(0, 0, a, c);
    var n, e, t, o, l;
    s.forEach(function(i, x) {
      for (
        i.x += i.xa,
        i.y += i.ya,
        i.xa *= i.x > a || i.x < 0 ? -1 : 1,
        i.ya *= i.y > c || i.y < 0 ? -1 : 1,
        r.fillRect(i.x - 0.5, i.y - 0.5, 1, 1),
        e = x + 1;
        e < u.length;
        e++
      ) {
        (n = u[e]), null !== n.x && null !== n.y &&
        ((o = i.x - n.x),
        (l = i.y - n.y),
        (t = o * o + l * l),
        t < n.max &&
          ((n === y && t >= n.max / 2 && ((i.x -= 0.03 * o), (i.y -= 0.03 * l)),
            (d = (n.max - t) / n.max),
            r.beginPath(),
            r.lineWidth = 0.4,
            r.strokeStyle = "rgb(" + d * 241 + "," + d * 156 + "," + 0 + ")",
            r.moveTo(i.x, i.y),
            r.lineTo(n.x, n.y),
            r.stroke())));
      }
    }),
    x(i);
  }

  var a,
    c,
    u,
    m = document.createElement("canvas"),
    d = t(),
    l = "c_n" + d.l,
    r = m.getContext("2d"),
    x =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(n) {
        window.setTimeout(n, 1000 / 45);
      },
    w = Math.random,
    y = { x: null, y: null, max: 20000 };
  (m.id = l),
  (m.style.cssText =
    "position:fixed;top:0;left:0;z-index:" +
    d.z +
    ";opacity:" +
    d.o +
    ";pointer-events:none;"),  // 添加 pointer-events:none; 确保鼠标事件不会被阻挡
  e("body")[0].appendChild(m),
  o(),
  (window.onresize = o),
  (window.onmousemove = function(n) {
    (n = n || window.event), (y.x = n.clientX), (y.y = n.clientY);
  }),
  (window.onmouseout = function() {
    y.x = null;
    y.y = null;
  });

  for (var s = [], f = 0; d.count > f; f++) {
    var h = w() * a,
      g = w() * c,
      v = 2 * w() - 1,
      p = 2 * w() - 1;
    s.push({ x: h, y: g, xa: v, ya: p, max: 6000 });
  }
  u = s.concat([y]), setTimeout(function() {
    i();
  }, 100);
}

if (!isMobile.any()) {
  dz();
}
