const win = UI.createWindow("Positive Physics");

// HOME TAB
win.addTab("Home", (p) => {
  UI.label(p, "Welcome");

  UI.message(p, "UI system loaded successfully");

  UI.button(p, "Test Button", () => {
    UI.message(p, "Button clicked");
  });

  UI.toggle(p, "Example Toggle", (v) => {
    console.log("Toggle:", v);
    UI.message(p, "Toggle state: " + v);
  });
});

// TOOLS TAB
win.addTab("Tools", (p) => {
  UI.label(p, "Controls");

  UI.slider(p, "Speed", 0, 100, (v) => {
    console.log("Speed:", v);
    UI.message(p, "Speed set to " + v);
  });

  UI.color(p, "Color Picker", (v) => {
    console.log("Color:", v);
    UI.message(p, "Color: " + v);
  });

  UI.button(p, "Clear Screen", () => {
    UI.message(p, "Cleared");
  });
});

// SETTINGS TAB
win.addTab("Settings", (p) => {
  UI.label(p, "System");

  UI.toggle(p, "Mac Mode Detected: " + window.isMac, () => {});
});
