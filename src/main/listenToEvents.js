import { ipcMain, BrowserWindow } from 'electron'
import { download } from 'electron-dl'
import events from '&/events'

export default function () {
  ipcMain.on(events.DOWNLOAD, (e, url) => {
    download(BrowserWindow.getFocusedWindow(), url, {
      openFolderWhenDone: true
    })
  })
}
