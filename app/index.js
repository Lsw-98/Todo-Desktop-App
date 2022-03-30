const { app, BrowserWindow } = require('electron')
const startServer = require('./server/bin/www')

function createWindow() {
  startServer()
  const win = new BrowserWindow({
    // 窗口大小
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
    },
  })
  // 去掉自带的菜单栏
  win.menuBarVisible = false
  // 加载index.html文件
  win.loadFile('index.html')
}

// 创建一个window窗口
app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
