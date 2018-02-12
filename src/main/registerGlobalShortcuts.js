import { globalShortcut } from 'electron'
import events from '&/events'

export default win => {
  const shortcuts = ['MediaNextTrack', 'MediaPreviousTrack', 'MediaStop', 'MediaPlayPause']

  shortcuts.forEach(key => {
    globalShortcut.register(key, () => win.webContents.send(events.GLOBAL_SHORTCUT, key))
  })
}
