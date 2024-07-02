const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('src/Index.html');
}

function createNewWindow(url) {
    const newWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    newWindow.loadURL(url);
}

app.on('ready', () => {
    createMainWindow();

    ipcMain.on('open-new-window', (event, url) => {
        createNewWindow(url);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});
