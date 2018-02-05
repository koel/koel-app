'use strict'

import { app, BrowserWindow, globalShortcut } from 'electron'
import windowStateKeeper from 'electron-window-state'
import createMenu from './createMenu'
import registerGlobalShortcuts from './registerGlobalShortcuts'

const MIN_WINDOW_WIDTH = 1280
const MIN_WINDOW_HEIGHT = 640

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const createWindow = () => {
  const mainWindowState = windowStateKeeper({
    defaultWith: MIN_WINDOW_WIDTH,
    defaultHeight: MIN_WINDOW_HEIGHT
  })
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width < MIN_WINDOW_WIDTH ? MIN_WINDOW_WIDTH : mainWindowState.width,
    height: mainWindowState.height < MIN_WINDOW_HEIGHT ? MIN_WINDOW_HEIGHT : mainWindowState.height,
    fullscreenable: false,
    titleBarStyle: 'hiddenInset',
    minHeight: MIN_WINDOW_HEIGHT,
    minWidth: MIN_WINDOW_WIDTH,
    autoHideMenuBar: true,
    darkTheme: true,
    show: false,
    backgroundColor: '#181818'
  })

  mainWindow.once('ready-to-show', () => mainWindow.show())

  if (mainWindowState.isMaximized) {
    mainWindow.maximize()
  }

  mainWindowState.manage(mainWindow)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
  createMenu(mainWindow)
  registerGlobalShortcuts(mainWindow)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('will-quit', () => globalShortcut.unregisterAll())

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
