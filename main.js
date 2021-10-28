const {BrowserWindow, app} = require("electron")
const express = require("express")

let mainWindow
let exApp = express()
exApp.use(express.static('./'))
// exApp.use(express.static('./resources/app'))

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: 'favicon.ico'
    })
    mainWindow.menuBarVisible = false
    mainWindow.maximize()

    const server = exApp.listen(0, () => {
        console.log(`port is ${server.address().port}`)
        mainWindow.loadURL(`http://localhost:${server.address().port}/`)
        mainWindow.show()
        mainWindow.on('closed', function () {
            mainWindow = null
            exApp = null
        })
    })
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})
