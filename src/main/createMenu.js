import { app, BrowserWindow, Menu } from 'electron'

export default win => {
  const menuTemplate = [
    {
      label: 'Application',
      submenu: [
        { label: 'Reload', accelerator: 'CmdOrCtrl+R', click: () => win.reload() },
        { label: 'About Koel', click: () => win.webContents.send('cmd', 'ShowAboutPanel') },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click: () => app.quit() }
      ]
    }, {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
      ]
    }
  ]

  if (process.env.NODE_ENV === 'development') {
    menuTemplate.push({
      label: 'Development',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+CmdOrCtrl+I',
          click: () => BrowserWindow.getFocusedWindow().toggleDevTools()
        }
      ]
    })

    win.openDevTools()
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
}
