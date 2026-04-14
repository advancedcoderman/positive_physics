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
      bg: "#1e1f22",
      panel: "#2b2d31",
      side: "#232428",
      tab: "#2b2d31",
      tabActive: "#3a3c43",
      button: "#3a3c43",
      text: "#b5bac1",
      white: "#ffffff"
    };

    const S = {
      w: "700px",
      h: "420px",
      title: "32px",
      side: "140px"
    };

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
        background: C.panel,
        borderRadius: "10px",
        overflow: "hidden",
        zIndex: 999999,
        fontFamily: "Arial",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
      });

      const topbar = el("div", {
        height: S.title,
        background: C.bg,
        display: "flex",
        alignItems: "center",
        padding: "0 6px",
        gap: "6px"
      });

      const body = el("div", {
        display: "flex",
        height: `calc(100% - ${S.title})`
      });

      const sidebar = el("div", {
        width: S.side,
        background: C.side,
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "6px"
      });

      const content = el("div", {
        flex: 1,
        padding: "14px",
        color: C.text,
        overflow: "auto",
        fontSize: "13px"
      });

      append(body, sidebar, content);
      append(root, topbar, body);

      document.body.appendChild(root);

      drag(topbar, root);

      const tabs = {};
      const buttons = {};

      function switchTab(name) {
        content.innerHTML = "";
        if (tabs[name]) tabs[name](content);

        Object.keys(buttons).forEach(k => {
          buttons[k].style.background =
            k === name ? C.tabActive : C.tab;
        });
      }

      function addTab(name, fn) {
        const btn = el("div", {
          padding: "4px 10px",
          borderRadius: "6px",
          background: C.tab,
          color: C.text,
          fontSize: "12px",
          cursor: "pointer",
          userSelect: "none"
        }, { innerText: name });

        btn.onclick = () => switchTab(name);

        btn.onmouseenter = () => {
          if (btn.style.background !== C.tabActive)
            btn.style.background = "#333";
        };

        btn.onmouseleave = () => {
          if (btn.style.background !== C.tabActive)
            btn.style.background = C.tab;
        };

        topbar.appendChild(btn);

        tabs[name] = fn;
        buttons[name] = btn;

        if (Object.keys(tabs).length === 1) switchTab(name);
      }

      function button(p, t, fn) {
        const b = el("button", {
          width: "100%",
          padding: "7px",
          background: C.button,
          border: "none",
          borderRadius: "6px",
          color: "#fff",
          cursor: "pointer",
          textAlign: "left",
          fontSize: "12px"
        }, { innerText: t, onclick: fn });

        p.appendChild(b);
      }

      function toggle(p, t, fn) {
        let v = false;
        button(p, t, () => {
          v = !v;
          fn(v);
        });
      }

      function slider(p, t, min, max, fn) {
        const i = el("input", {}, {
          type: "range",
          min,
          max,
          value: min
        });

        i.style.width = "100%";
        i.oninput = () => fn(i.value);

        p.appendChild(i);
      }

      function color(p, t, fn) {
        const i = el("input", {}, { type: "color" });
        i.style.width = "100%";
        i.oninput = () => fn(i.value);
        p.appendChild(i);
      }

      function label(p, t) {
        const d = el("div", {
          fontSize: "10px",
          color: "#777",
          margin: "8px 0 4px"
        }, { innerText: t });

        p.appendChild(d);
      }

      function message(p, t) {
        const box = el("div", {
          padding: "8px",
          marginTop: "6px",
          borderRadius: "6px",
          background: "#3a3c43",
          color: "#fff",
          fontSize: "12px"
        }, { innerText: t });

        p.appendChild(box);
      }

      return {
        root,
        sidebar,
        content,
        addTab,
        button,
        toggle,
        slider,
        color,
        label,
        message
      };
    }

    return { createWindow };

  })();

  window.UI = UI;
  window.isMac = isMac;
})();
