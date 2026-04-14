const win = UI.createWindow("My Panel");

UI.label(win.side, "Tools");

UI.button(win.side, "Test Button", () => {
  UI.log("Button clicked");
});

UI.toggle(win.side, "Toggle A", v => {
  UI.log("Toggle: " + v);
});

UI.slider(win.side, "Speed", 0, 100, v => {
  UI.log("Speed: " + v);
});

UI.color(win.side, "Color", v => {
  UI.log("Color: " + v);
});
