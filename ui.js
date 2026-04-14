const win = UI.createWindow("Positive Physics");

// Tab 1
win.addTab("Home", (p) => {
  UI.label(p, "Main");
  UI.message(p, "Welcome to the UI system");

  UI.button(p, "Test Button", () => {
    UI.message(p, "Button clicked");
  });

  UI.toggle(p, "Toggle Example", v => {
    console.log("Toggle:", v);
  });
});

// Tab 2
win.addTab("Tools", (p) => {
  UI.label(p, "Controls");

  UI.slider(p, "Speed", 0, 100, v => {
    console.log("Speed:", v);
  });

  UI.color(p, "Color", v => {
    console.log("Color:", v);
  });
});
