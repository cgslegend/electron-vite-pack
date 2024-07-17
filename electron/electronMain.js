/**
 * electron 的主进程
 */
// 导入模块
const { app, BrowserWindow  } = require('electron')

const path = require('path')

// 创建主窗口
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    // 加载当前vue 的地址
    let devUrl = process.argv[2]
    if(devUrl){
        win.loadURL(devUrl)
    }else{
        win.loadFile(path.resolve(__dirname,'pages/index.html'))
    }

}

// 应用准备就绪，加载窗口
app.whenReady().then(() => {

    console.log('electronMain.js : ready')

    createWindow()

    // mac 上默认保留一个窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    console.log('--- app ready ---')
})

// 关闭所有窗口 ： 程序退出 ： windows & linux
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
