const { app, BrowserWindow } = require('electron')
const startServer = require('./server/bin/www')

function createWindow() {
  startServer()
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   webSecurity: false,
    // },
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
