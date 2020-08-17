
import {$setHotkey, $delHotkey} from './vm-hotkey.js'
import {registerKeydown,registerKeyup} from './document-key-handler.js'
const hotkeyManager = {

  install (Vue) {
    window.keymap = []
    registerKeydown();
    registerKeyup();
    Vue.prototype.$setHotkey = $setHotkey
    Vue.prototype.$delHotkey = $delHotkey
  }
}



export default hotkeyManager