(() => {
  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);

  const el = (t, s = {}, a = {}) => {
    const e = document.createElement(t);
    Object.assign(e.style, s);
    Object.assign(e, a);
    return e;
  };

  const append = (p, ...c) => (c.forEach(x => p.appendChild(x)), p);

  const logBox = { el: null };
  const log = (t) => {
    if (!logBox.el) return;
    const d = el("div", {
      fontSize: "11px",
      padding: "2px",
      borderBottom: "1px solid #333",
      color: "#b5bac1"
    }, { innerText: t });

    logBox.el.appendChild(d);
    logBox.el.scrollTop = logBox.el.scrollHeight;
  };

  const UI = (() => {
    const C = {
      bg: "#2b2d31",
      dark: "#1e1f22",
      side: "#232428",
      btn: "#3a3c43",
      text: "#b5bac1",
      white: "#ffffff"
    };

    function drag(handle, target) {
      let d = 0, x = 0, y = 0;

      handle.onmousedown = (e) => {
        d = 1;
        x = e.clientX - target.offsetLeft;
        y = e.clientY - target.offsetTop;
      };

      document.onmousemove = (e) => {
        if (!d) return;
        target.style.left = (e.clientX - x) + "px";
        target.style.top = (e.clientY - y) + "px";
      };

      document.onmouseup = () => d = 0;
    }

    function createWindow(title) {
      const root = el("div", {
        position: "fixed",
        top: "80px",
        left: "80px",
        width: "650px",
        height: "420px",
        background: C.bg,
        zIndex: 999999,
        borderRadius: "8px",
        overflow: "hidden",
        fontFamily: "Arial"
      });

      const top = el("div", {
        height: "30px",
        background: C.dark,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 10px",
        cursor: "move",
        color: C.white
      }, { innerText: title });

      const body = el("div", {
        display: "flex",
        height: "calc(100% - 30px)"
      });

      const side = el("div", {
        width: "130px",
        background: C.side,
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "4px"
      });

      const content = el("div", {
        flex: 1,
        padding: "10px",
        color: C.white,
        overflow: "auto"
      });

      const debug = el("div", {
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        height: "140px",
        background: "#111",
        overflow: "auto",
        fontSize: "11px",
        color: "#b5bac1",
        zIndex: 999999
      });

      logBox.el = debug;

      append(body, side, content);
      append(root, top, body);
      document.body.appendChild(root);
      document.body.appendChild(debug);

      drag(top, root);

      return { root, side, content };
    }

    function button(parent, text, fn) {
      const b = el("button", {
        width: "100%",
        padding: "6px",
        background: C.btn,
        color: C.white,
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        textAlign: "left"
      }, { innerText: text, onclick: fn });

      parent.appendChild(b);
      return b;
    }

    function toggle(parent, text, fn) {
      let v = false;
      button(parent, text, () => {
        v = !v;
        log(text + " " + v);
        fn(v);
      });
    }

    function slider(parent, text, min, max, fn) {
      const i = el("input", { width: "100%" }, {
        type: "range",
        min,
        max,
        value: min
      });

      i.oninput = () => {
        log(text + " " + i.value);
        fn(i.value);
      };

      parent.appendChild(i);
    }

    function color(parent, text, fn) {
      const i = el("input", { width: "100%" }, { type: "color" });

      i.oninput = () => {
        log(text + " " + i.value);
        fn(i.value);
      };

      parent.appendChild(i);
    }

    function label(parent, text) {
      const d = el("div", {
        fontSize: "11px",
        color: "#888",
        margin: "6px 0"
      }, { innerText: text });

      parent.appendChild(d);
    }

    return {
      createWindow,
      button,
      toggle,
      slider,
      color,
      label,
      log
    };
  })();

  window.UI = UI;
  window.isMac = isMac;

  console.log("UI loaded:", isMac ? "Mac" : "PC");
})();
