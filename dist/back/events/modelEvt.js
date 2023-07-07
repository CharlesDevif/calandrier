"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const model_1 = require("../model");
const node_path_1 = require("node:path");
exports.default = () => {
    electron_1.ipcMain.handle('bdd-get-all', async (e) => {
        return await (0, model_1.getAll)();
    });
    electron_1.ipcMain.handle('bdd-add-user', async (e, params) => {
        return await (0, model_1.addUser)(params);
    });
    electron_1.ipcMain.handle('bdd-del-user', async (e, params) => {
        return await (0, model_1.delUser)(params);
    });
    electron_1.ipcMain.handle('open', () => {
        const secondWindow = new electron_1.BrowserWindow({
            width: 800,
            height: 600,
            title: "Ma deuxième fenetre",
            icon: (0, node_path_1.join)(__dirname, '../pages/img/typescript.png'),
        });
        // and load the index.html of the app.
        secondWindow.loadFile('./pages/page2.html');
        // mainWindow.loadURL('https://github.com')
        // Open the DevTools.
        // mainWindow.webContents.openDevTools()
        //gestion des évènements
        // mainWindow.on("move", () => {
        //   console.log('fenetre deplacé');
        // })
    });
};
