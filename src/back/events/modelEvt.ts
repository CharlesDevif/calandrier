import { BrowserWindow, ipcMain } from "electron";
import { addUser, delUser, getAll } from "../model";
import { IUser } from "../../interfaces/user";
import { join } from 'node:path'

export default () => {
    ipcMain.handle('bdd-get-all', async (e) => {
        return await getAll()
    })

    ipcMain.handle('bdd-add-user', async (e, params: IUser) => {
        return await addUser(params)
    })

    ipcMain.handle('bdd-del-user', async (e, params: number) => {
        return await delUser(params)
    })

    ipcMain.handle('open', () => {
        const secondWindow = new BrowserWindow({
            width: 800,
            height: 600,
            title: "Ma deuxième fenetre",

            icon: join(__dirname, '../pages/img/typescript.png'),


        })

        // and load the index.html of the app.
        secondWindow.loadFile('./pages/page2.html')
        // mainWindow.loadURL('https://github.com')


        // Open the DevTools.
        // mainWindow.webContents.openDevTools()

        //gestion des évènements
        // mainWindow.on("move", () => {
        //   console.log('fenetre deplacé');

        // })
    })
}