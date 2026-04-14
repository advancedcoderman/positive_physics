(() => {
  const el = (t, s = {}, a = {}) => {
    const e = document.createElement(t);
    Object.assign(e.style, s);
    Object.assign(e, a);
    return e;
  };

  const append = (p, ...c) => (c.forEach(x => p.appendChild(x)), p);

  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);

  const UI = (() => {

    const C = {
      bg: "#2b2d31",
      bgDark: "#1e1f22",
      bgSidebar: "#232428",
      bgButton: "#3a3c43",
      bgClose: "#da373c",
      text: "#b5bac1",
      textBright: "#ffffff",
      success: "#248046",
      warn: "#e67e22"
    };

    const S = {
      w: "680px",
      h: "400px",
      title: "34px",
      side: "140px"
    };

    let debugBox = null;

    function log(msg) {
      if (!debugBox) return;

      const line = el("div", {
        fontSize: "10px",
        padding: "2px 6px",
        borderBottom: "1px solid #1b1b1b",
        color: "#9aa0a6",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }, { innerText: String(msg) });

      debugBox.appendChild(line);
      debugBox.scrollTop = debugBox.scrollHeight;
    }

    function drag(handle, target) {
      let down = false, ox = 0, oy = 0;

      handle.onmousedown = e => {
        down = true;
        ox = e.clientX - target.offsetLeft;
        oy = e.clientY - target.offsetTop;
      };

      document.onmousemove = e => {
        if (!down) return;
        target.style.left = (e.clientX - ox) + "px";
        target.style.top = (e.clientY - oy) + "px";
      };

      document.onmouseup = () => down = false;
    }

    function createWindow(title) {
      const root = el("div", {
        position: "fixed",
        top: "90px",
        left: "90px",
        width: S.w,
        height: S.h,
        background: C.bg,
        borderRadius: "10px",
        overflow: "hidden",
        zIndex: 999999,
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
      });

      const body = el("div", {
        display: "flex",
        height: `calc(100% - ${S.title})`
      });

      const sidebar = el("div", {
        width: S.side,
        background: C.bgSidebar,
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "6px"
      });

      const content = el("div", {
        flex: 1,
        padding: "14px",
        color: C.textBright,
        overflow: "auto",
        fontSize: "13px",
        lineHeight: "1.4"
      });

      const titlebar = el("div", {
        height: S.title,
        background: C.bgDark,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 10px",
        cursor: "move",
        color: C.text,
        fontSize: "13px",
        fontWeight: "500"
      }, { innerText: title });

      debugBox = el("div", {
        position: "fixed",
        bottom: "10px",
        left: "10px",
        width: "260px",
        height: "90px",
        background: "#0f0f10",
        border: "1px solid #222",
        borderRadius: "8px",
        overflow: "auto",
        fontSize: "10px",
        zIndex: 999998,
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
      });

      const btn = (t, bg, fn) =>
        el("button", {
          width: "20px",
          height: "20px",
          border: "none",
          borderRadius: "5px",
          background: bg,
          color: "white",
          cursor: "pointer",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }, { innerText: t, onclick: fn });

      const min = btn("-", C.bgButton, () => {
        const h = body.style.display === "none";
        body.style.display = h ? "flex" : "none";
        root.style.height = h ? S.h : S.title;
      });

      const close = btn("x", C.bgClose, () => root.remove());

      const group = el("div", {
        display: "flex",
        gap: "6px"
      });

      append(group, min, close);
      append(titlebar, group);

      append(body, sidebar, content);
      append(root, titlebar, body);

      document.body.appendChild(root);
      document.body.appendChild(debugBox);

      drag(titlebar, root);

      return { root, sidebar, content, log };
    }

    function button(p, t, fn, bg = C.bgButton) {
      const b = el("button", {
        width: "100%",
        padding: "7px 8px",
        background: bg,
        border: "none",
        borderRadius: "6px",
        color: C.textBright,
        cursor: "pointer",
        textAlign: "left",
        fontSize: "12px",
        transition: "0.15s"
      }, { innerText: t, onclick: fn });

      b.onmouseenter = () => b.style.filter = "brightness(1.15)";
      b.onmouseleave = () => b.style.filter = "brightness(1)";

      p.appendChild(b);
      return b;
    }

    function toggle(p, t, fn) {
      let v = false;
      button(p, t, () => {
        v = !v;
        log(t + ": " + v);
        fn(v);
      });
    }

    function slider(p, t, min, max, fn) {
      const wrap = el("div", { margin: "6px 0" });

      const i = el("input", { width: "100%" }, {
        type: "range",
        min,
        max,
        value: min
      });

      i.oninput = () => {
        log(t + ": " + i.value);
        fn(i.value);
      };

      wrap.appendChild(i);
      p.appendChild(wrap);
    }

    function color(p, t, fn) {
      const i = el("input", { width: "100%", height: "28px" }, { type: "color" });

      i.oninput = () => {
        log(t + ": " + i.value);
        fn(i.value);
      };

      p.appendChild(i);
    }

    function label(p, t) {
      const d = el("div", {
        fontSize: "10px",
        letterSpacing: "0.5px",
        color: "#777",
        margin: "8px 0 4px"
      }, { innerText: t });

      p.appendChild(d);
    }

    function setContent(c, t) {
      c.innerText = t;
    }

    function message(c, t, type = "info") {
      const colors = {
        info: C.bgButton,
        success: C.success,
        warn: C.warn
      };

      const box = el("div", {
        padding: "8px",
        marginTop: "6px",
        borderRadius: "6px",
        background: colors[type] || C.bgButton,
        fontSize: "12px"
      }, { innerText: t });

      c.appendChild(box);
    }

    return {
      createWindow,
      button,
      toggle,
      slider,
      color,
      label,
      setContent,
      message,
      log
    };

  })();

  window.UI = UI;
  window.isMac = isMac;

  console.log("UI loaded:", isMac ? "Mac" : "PC");
})();
