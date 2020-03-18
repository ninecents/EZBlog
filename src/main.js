// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView, screen } = require('electron')
const path = require('path')

let g_Data = {
  mainWindow: null,         // 主窗口
  blog_view: null,          //    博客页面
  markdown: null,           //    markdown页面
  mdnice: null              //    效果页面
}

function createWindow() {
  const screen_size = screen.getPrimaryDisplay().size

  // 计算view的坐标
  _x = 0
  _y = 0
  _width = (screen_size.width)
  _height = screen_size.height - 50

  // Create the browser window.
  {
    mainWindow = new BrowserWindow({
      x: _x,
      y: _y,
      width: _width,
      height: _height,
      // title: 'OneWrite操作台',
      webPreferences: {
        // webSecurity: false,
        nodeIntegration: true,
        nodeintegrationinsubframes: true,
        webviewTag: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })
    
    // 禁用X-Frame-Options
    if(false)
    {
      var onHeadersReceived=(d, c)=>{
        if(d.responseHeaders['X-Frame-Options']){
            delete d.responseHeaders['X-Frame-Options'];
        }
        c({cancel: false, responseHeaders: d.responseHeaders});
      }    
      mainWindow.webContents.session.webRequest.onHeadersReceived({}, onHeadersReceived);      
    }

    // 加载本地页面
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// const {session} = require('electron')
// const {ipcMain} = require('electron')

// ipcMain.on('disable-x-frame', (event, arg) => {
	
//   session.fromPartition(arg.partition).webRequest.onHeadersReceived({}, (d, c) => {
							
// 	if(d.responseHeaders['x-frame-options'] || d.responseHeaders['X-Frame-Options']){
// 		delete d.responseHeaders['x-frame-options'];
// 		delete d.responseHeaders['X-Frame-Options'];
// 	}
// 	c({cancel: false, responseHeaders: d.responseHeaders, statusLine: d.statusLine});
//   });

// });