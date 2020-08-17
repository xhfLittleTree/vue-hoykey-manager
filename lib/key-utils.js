import { Keys } from './keys.js'
const KEYS = Keys

const keyUtils = {
  /**
   * 判断两个热键是否为相同热键
   */
  isEqual: (a, b) => {
    if (!a || !b) {
      return false
    }
    let aKeys = a.split('+');
    let bKeys = b.split('+');

    if (aKeys.length !== bKeys.length) return false;

    for (let i = 0; i < aKeys.length; i++) {
      if (bKeys.indexOf(aKeys[i]) === -1) {
        return false;
      }
    }
    return true;
  },


  /**
   * 根据按键的DOM寻找Vue实例
   *
   */
  getClosestVueInstance: (element) => {
    if (element) {
      return element.__vue__ || keyUtils.getClosestVueInstance(element.parentElement);
    }
  },



  /**
   * 阻止event的默认事件和冒泡
   */

  stopEvent: (e) => {
    e.preventDefault()
    e.stopPropagation()
  },

  /**
   * 根据keycode对应表获得对应的str
   */
  getShortcut: (e) => {
    let shortcut = '';
    if (e.altKey) {
      shortcut += shortcut ? '+alt' : 'alt'
    }
    if (e.ctrlKey) {
      shortcut += shortcut ? '+ctrl' : 'ctrl'
    }
    if (e.shiftKey) {
      shortcut += shortcut ? '+shift' : 'shift'
    }
    if (e.metaKey) {
      shortcut += shortcut ? '+window' : 'window'
    }
    if (e.keyCode != 229 && KEYS.hasOwnProperty(e.keyCode)) {
      let keyStr = KEYS[e.keyCode];
      shortcut += shortcut ? '+' + keyStr : keyStr;
    }
    return shortcut
  },

  /**
   * 判断是否为对象
   */
  isObject: (obj) => {
    return Object.prototype.toString.call(obj) == "[object Object]"
  },

  /**
   * 判断是否为数组
   */
  isArray: (obj) => {
    return Object.prototype.toString.call(obj) == "[object Array]"
  },

    /**
   * 判断是否为Dom
   */
  isHTMLElement: (dom) => {
    return Boolean(Object.prototype.toString.call(dom).match(/HTML.*Element/))
  },
}

export default keyUtils
