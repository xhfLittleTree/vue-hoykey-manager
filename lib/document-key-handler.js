
import keyUtils from './key-utils.js'

/**
 * 监听keydown
 *
 */
function registerKeydown () {
  document.addEventListener('keydown', (e) => {
    handleKeysEvent(e);
  }, true);
}


/**
 * 监听keyup
 *
 */
function registerKeyup () {
  document.addEventListener('keyup', () => {
  }, true);
}


/**
 * 键盘事件
 */
function handleKeysEvent (e) {

  let shortcut = keyUtils.getShortcut(e)
  let active = document.activeElement
  let activeVueComponet = keyUtils.getClosestVueInstance(active) || window


  matchMap(activeVueComponet)

  function matchMap (vm) {

    if (!vm) return
    if (vm.hasOwnProperty('keymap')) {
      let keymap = vm.keymap;
      for (let i = 0; i < keymap.length; i++) {
        if (keyUtils.isEqual(keymap[i].key, shortcut)) {
          keymap[i].fn(e)
          keyUtils.stopEvent(e)
          return
        }
      }
    }
    matchMap(vm.$parent || window)
  }
}

export { registerKeydown, registerKeyup }