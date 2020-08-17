//提供交易中组件注册热键的方法
import keyUtils from './key-utils.js'

/**
* 注册热键
*
*/
function $setHotkey (vm, key, fn) {
  if (!vm) {
    console.log("vue实例不存在")
    return
  }
  if(keyUtils.isHTMLElement(vm)){
    vm = keyUtils.getClosestVueInstance(vm)
  }
  let keyLowerCase = key.toLocaleLowerCase().replace(/\s/g, '');
  fn = fn.bind(this)
  let hotkeyData = {
    key: keyLowerCase,
    fn: fn,
  }
  let hasSameKey = false
  if (!vm.hasOwnProperty('keymap')) {
    vm['keymap'] = []
  } else {
    vm['keymap'].forEach((item) => {
      if (item.key == keyLowerCase) {
        hasSameKey = true;
        item.fn = fn; //如果有相同的方法，后注册的覆盖先注册的
        return
      }
    })
  }
  if (!hasSameKey) {
    vm['keymap'].push(hotkeyData)
  }
}


/**
 * 删除热键
 *
 */
function $delHotkey (vm, key) {
  if (!vm) {
    console.log("vue实例不存在")
    return
  }
  if(keyUtils.isHTMLElement(vm)){
    vm = keyUtils.getClosestVueInstance(vm)
  }
  let keyLowerCase = key.toLocaleLowerCase().replace(/\s/g, '');
  if (vm.hasOwnProperty('keymap')) {
    vm['keymap'].forEach((item, index) => {
      if (keyUtils.isEqual(item.key, keyLowerCase)) {
        vm['keymap'].splice(index, 1)
      }
    })
  }
}

export { $setHotkey, $delHotkey }