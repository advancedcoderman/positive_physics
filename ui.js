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
      w: "650px",
      h: "380px",
      title: "30px",
      side: "130px"
    };

    let debug = null;

    function log(msg) {
      if (!debug) return;
      const line = el("div", {
        fontSize: "10px",
        padding: "2px 4px",
        borderBottom: "1px solid #222",
        color: C.text
      }, { innerText: String(msg) });

      debug.appendChild(line);
      debug.scrollTop = debug.scrollHeight;
    }

    function drag(handle, target) {
      let d = false, ox = 0, oy = 0;

      handle.onmousedown = e => {
        d = true;
        ox = e.clientX - target.offsetLeft;
        oy = e.clientY - target.offsetTop;
      };

      document.onmousemove = e => {
        if (!d) return;
        target.style.left = (e.clientX - ox) + "px";
        target.style.top = (e.clientY - oy) + "px";
      };

      document.onmouseup = () => d = false;
    }

    function createWindow(title) {
      const root = el("div", {
        position: "fixed",
        top: "80px",
        left: "80px",
        width: S.w,
        height: S.h,
        background: C.bg,
        borderRadius: "8px",
        overflow: "hidden",
        zIndex: 999999,
        fontFamily: "Arial"
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
        gap: "4px"
      });

      const content = el("div", {
        flex: 1,
        padding: "10px",
        color: C.textBright,
        overflow: "auto"
      });

      const titlebar = el("div", {
        height: S.title,
        background: C.bgDark,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 10px",
        cursor: "move",
        color: C.text
      }, { innerText: title });

      debug = el("div", {
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "420px",
        height: "110px",
        background: "#111",
        overflow: "auto",
        fontSize: "10px",
        zIndex: 999998
      });

      const btn = (t, bg, fn) =>
        el("button", {
          width: "20px",
          height: "20px",
          border: "none",
          borderRadius: "4px",
          background: bg,
          color: C.textBright,
          cursor: "pointer"
        }, { innerText: t, onclick: fn });

      const min = btn("-", C.bgButton, () => {
        const h = body.style.display === "none";
        body.style.display = h ? "flex" : "none";
        root.style.height = h ? S.h : S.title;
      });

      const close = btn("x", C.bgClose, () => root.remove());

      const group = el("div", { display: "flex", gap: "5px" });

      append(group, min, close);
      append(titlebar, group);

      append(body, sidebar, content);
      append(root, titlebar, body);

      document.body.appendChild(root);
      document.body.appendChild(debug);

      drag(titlebar, root);

      return { root, sidebar, content, log };
    }

    function button(p, t, fn, bg = C.bgButton) {
      const b = el("button", {
        width: "100%",
        padding: "6px",
        background: bg,
        border: "none",
        borderRadius: "4px",
        color: C.textBright,
        cursor: "pointer",
        textAlign: "left"
      }, { innerText: t, onclick: fn });

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

      p.appendChild(i);
    }

    function color(p, t, fn) {
      const i = el("input", { width: "100%" }, { type: "color" });

      i.oninput = () => {
        log(t + ": " + i.value);
        fn(i.value);
      };

      p.appendChild(i);
    }

    function label(p, t) {
      const d = el("div", {
        fontSize: "10px",
        color: "#777",
        margin: "6px 0"
      }, { innerText: t });

      p.appendChild(d);
    }

    function setContent(c, text) {
      c.innerText = text;
    }

    function message(c, text, colorType = "info") {
      const map = {
        info: C.bgButton,
        success: C.success,
        warn: C.warn
      };

      const box = el("div", {
        padding: "8px",
        marginTop: "6px",
        borderRadius: "6px",
        background: map[colorType] || C.bgButton,
        color: C.textBright,
        fontSize: "12px"
      }, { innerText: text });

      c.appendChild(box);
      return box;
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
