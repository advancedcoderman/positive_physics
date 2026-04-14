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
      w: "720px",
      h: "440px",
      top: "32px",
      side: "150px"
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
        top: "90px",
        left: "90px",
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
        height: S.top,
        background: C.bg,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "0 6px"
      });

      const body = el("div", {
        display: "flex",
        height: `calc(100% - ${S.top})`
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
      const tabBtns = {};

      function switchTab(name) {
        content.innerHTML = "";
        if (tabs[name]) tabs[name](content);

        Object.keys(tabBtns).forEach(k => {
          tabBtns[k].style.background =
            k === name ? C.tabActive : C.tab;
        });
      }

      function addTab(name, fn) {
        const btn = el("div", {
          padding: "5px 10px",
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
        tabBtns[name] = btn;

        if (Object.keys(tabs).length === 1) switchTab(name);
      }

      // ─────────────────────────────
      // FULL COMPATIBILITY FIX HERE
      // ─────────────────────────────

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

      // IMPORTANT FIX: missing functions that caused crash

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

  // ─── APP ─────────────────────────────────────────────

  const win = UI.createWindow("Positive Physics");

  win.addTab("Home", (p) => {
    UI.label(p, "Main");

    UI.message(p, "System loaded");

    UI.button(p, "Test Button", () => {
      UI.message(p, "Clicked");
    });

    UI.toggle(p, "Toggle Example", v => {
      UI.message(p, "Toggle: " + v);
    });
  });

  win.addTab("Tools", (p) => {
    UI.label(p, "Controls");

    UI.slider(p, "Speed", 0, 100, v => {
      UI.message(p, "Speed: " + v);
    });

    UI.color(p, "Color", v => {
      UI.message(p, "Color: " + v);
    });
  });

  win.addTab("Settings", (p) => {
    UI.label(p, "System Info");

    UI.message(p, "Mac: " + isMac);
  });

})();
