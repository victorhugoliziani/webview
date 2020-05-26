const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config');

let win;

function createWindow () {
  // Cria uma janela de navegação.
  win = new BrowserWindow({
    width: 340,
    height: 600,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadURL(config.url)
}

function toggleDevTools() {
    win.webContents.toggleDevTools()
}

function createShortCuts() {
    globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}

app.whenReady()
    .then(createWindow)
    .then(createShortCuts);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})