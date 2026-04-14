const win = UI.createWindow("Positive Physics");

UI.label(win.sidebar, "Tabs");

UI.button(win.sidebar, "Tab 1", () => {
  UI.setContent(win.content, "");
  UI.message(win.content, "Tab 1 opened", "info");
});

UI.button(win.sidebar, "Tab 2", () => {
  UI.setContent(win.content, "");
  UI.message(win.content, "Tab 2 opened", "success");
});

UI.label(win.sidebar, "Tools");

UI.button(win.sidebar, "Clear", () => {
  UI.setContent(win.content, "");
}, "#da373c");

UI.toggle(win.sidebar, "Toggle Debug Feature", v => {
  UI.log("Toggle: " + v);
});

UI.slider(win.sidebar, "Speed", 0, 100, v => {
  UI.log("Speed: " + v);
});

UI.color(win.sidebar, "Color", v => {
  UI.log("Color: " + v);
});

UI.message(win.content, "UI loaded successfully", "info");
UI.message(win.content, "Press buttons on the left", "info");
