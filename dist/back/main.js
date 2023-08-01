"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Modules to control application life and create native browser window
const electron_1 = require("electron");
const node_path_1 = require("node:path");
// import handleEvt from './events/modelEvt'
// handleEvt()
const menuTpl = [
    {
        label: "Menu",
        type: "submenu",
        submenu: [
            {
                label: 'test',
                type: 'normal',
                click: () => {
                    console.log('click sur menu');
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'quitter',
                type: 'normal',
                role: 'quit'
            }
        ]
    }
];
const menu = electron_1.Menu.buildFromTemplate(menuTpl);
electron_1.Menu.setApplicationMenu(menu);
function createWindow() {
    // Create the browser window.
    const mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        title: "Mon CRUD Electron",
        icon: (0, node_path_1.join)(__dirname, '../../pages/img/typescript.png'),
        webPreferences: {
            preload: (0, node_path_1.join)(__dirname, '../front/preload/preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    // and load the index.html of the app.
    mainWindow.loadFile('./pages/index.html');
    // mainWindow.loadURL('https://github.com')
    mainWindow.setMenu(menu);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    //gestion des évènements
    // mainWindow.on("move", () => {
    //   console.log('fenetre deplacé');
    // })
    electron_1.ipcMain.handle('open-new-window', (event, number) => {
        console.log("test open win");
        openNewElectronWindow(number);
    });
}
function openNewElectronWindow(number) {
    const newWindow = new electron_1.BrowserWindow({
        width: 400,
        height: 300,
        title: `Nouvelle fenêtre - ${number}`,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    newWindow.webContents.send('init', number);
    newWindow.webContents.openDevTools();
    newWindow.loadFile('./pages/add-event.html');
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
