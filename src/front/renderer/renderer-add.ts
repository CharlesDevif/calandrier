const electron = require("electron")

electron.ipcRenderer.on('init', (event :any,parms :number) => {
console.log(parms);

})