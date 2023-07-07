// Modules to control application life and create native browser window
import { app, BrowserWindow, Menu } from 'electron'
import { join } from 'node:path'

import handleEvt from './events/modelEvt'

handleEvt()



const menuTpl: any = [
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
]
const menu = Menu.buildFromTemplate(menuTpl)


Menu.setApplicationMenu(menu)
function createWindow() {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Mon CRUD Electron",

    icon: join(__dirname, '../../pages/img/typescript.png'),

    webPreferences: {
      preload: join(__dirname, '../front/preload/preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./pages/index.html')
  // mainWindow.loadURL('https://github.com')

  mainWindow.setMenu(menu)
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  //gestion des évènements
  // mainWindow.on("move", () => {
  //   console.log('fenetre deplacé');

  // })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
