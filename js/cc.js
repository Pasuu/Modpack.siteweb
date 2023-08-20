$(function() {
    function t(t) {
        function i(t) {
            d = document.createElement("canvas"),
            f = d.getContext("2d"),
            d.style.top = "0px",
            d.style.left = "0px",
            d.style.pointerEvents = "none",
            r ? (d.style.position = "absolute",
            u.appendChild(d),
            d.width = u.clientWidth,
            d.height = u.clientHeight) : (d.style.position = "fixed",
            document.body.appendChild(d),
            d.width = p,
            d.height = y),
            e(),
            a()
        }
        function e() {
        //    u.addEventListener("mousemove", h);
        //   u.addEventListener("touchmove", o);
        //  u.addEventListener("touchstart", o);
            window.addEventListener("resize", n);
            // 添加点击事件监听器
            u.addEventListener("click", onClick);
        }
        function n(t) {
            p = window.innerWidth,
            y = window.innerHeight,
            r ? (d.width = u.clientWidth,
            d.height = u.clientHeight) : (d.width = p,
            d.height = y)
        }
        function o(t) {
            if (t.touches.length > 0)
                for (let i = 0; i < t.touches.length; i++)
                    s(t.touches[i].clientX, t.touches[i].clientY, w[Math.floor(Math.random() * w.length)])
        }
        function h(t) {
            if (r) {
                const i = u.getBoundingClientRect();
                m.x = t.clientX - i.left,
                m.y = t.clientY - i.top
            } else
                m.x = t.clientX,
                m.y = t.clientY;
            s(m.x, m.y)
        }
        function s(t, i, e) {
            g.push(new c(t,i,e))
        }
        function l() {
            f.clearRect(0, 0, p, y);
            for (let t = 0; t < g.length; t++)
                g[t].update(f);
            for (let t = g.length - 1; t >= 0; t--)
                g[t].lifeSpan < 0 && g.splice(t, 1)
        }
        function a() {
            l(),
            requestAnimationFrame(a)
        }

        function onClick(event) {
            if (r) {
                const rect = u.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                const clickY = event.clientY - rect.top;
                const numBubbles = 10; // 设置气泡数量
                for (let i = 0; i < numBubbles; i++) {
                    s(clickX, clickY, w[Math.floor(Math.random() * w.length)]);
                }
            } else {
                const numBubbles = 10; // 设置气泡数量
                for (let i = 0; i < numBubbles; i++) {
                    s(event.clientX, event.clientY, w[Math.floor(Math.random() * w.length)]);
                }
            }
        }

        function c(t, i, e) {
            const n = Math.floor(60 * Math.random() + 60);
            this.initialLifeSpan = n,
            this.lifeSpan = n,
            this.velocity = {
                x: (Math.random() < .5 ? -1 : 1) * (Math.random() / 10),
                y: -1 * Math.random() - .4
            },
            this.position = {
                x: t,
                y: i
            },
            this.canv = e,
            this.baseDimension = 4,
            this.update = function(t) {
                this.position.x += this.velocity.x,
                this.position.y += this.velocity.y,
                this.velocity.x += 2 * (Math.random() < .5 ? -1 : 1) / 75,
                this.velocity.y -= Math.random() / 600,
                this.lifeSpan--;
                const i = .2 + (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;
                t.fillStyle = "#e6f1f7",
                t.strokeStyle = "#3a92c5",
                t.beginPath(),
                t.arc(this.position.x - this.baseDimension / 2 * i, this.position.y - this.baseDimension / 2, this.baseDimension * i, 0, 2 * Math.PI),
                t.stroke(),
                t.fill(),
                t.closePath()
            }
        }

        
        let d, f, r = t && t.element, u = r || document.body, p = window.innerWidth, y = window.innerHeight, m = {
            x: p / 2,
            y: p / 2
        }, g = [], w = [];
        i()
    }
    new t();
});
