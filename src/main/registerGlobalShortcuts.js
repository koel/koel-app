import { globalShortcut } from 'electron'

export default win => {
  const shortcuts = ['MediaNextTrack', 'MediaPreviousTrack', 'MediaStop', 'MediaPlayPause']

  shortcuts.forEach(key => {
    globalShortcut.register(key, () => win.webContents.send('shortcut', key))
  })
}
