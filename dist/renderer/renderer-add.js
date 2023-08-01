"use strict";
const electron = require("electron");
electron.ipcRenderer.on('init', (event, parms) => {
    console.log(parms);
});
