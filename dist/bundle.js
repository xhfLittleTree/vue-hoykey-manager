define(function () { 'use strict';

    const Keys ={
        '8': 'backspace',    
        '9': 'tab',
        '12': 'clear',       
        '13': 'enter',
        '16': 'shift',       
        '17': 'ctrl',        
        '18': 'alt',
        '19': 'pause',       
        '20': 'capslock',   
        '27': 'escape',      
        '32': 'space',       
        '33': 'pageup',     
        '34': 'pagedown',   
        '35': 'end',
        '36': 'home',        
        '37': 'leftarrow',  
        '38': 'uparrow',    
        '39': 'rightarrow', 
        '40': 'downarrow',  
        '45': 'insert',      
        '46': 'delete',      
        '47': 'help',        
        '48': '0',       
        '49': '1',       
        '50': '2',       
        '51': '3',       
        '52': '4',       
        '53': '5',       
        '54': '6',
        '55': '7',
        '56': '8',
        '57': '9',
        '65': 'a',
        '66': 'b',
        '67': 'c',
        '68': 'd',
        '69': 'e',
        '70': 'f',
        '71': 'g',
        '72': 'h',
        '73': 'i',
        '74': 'j',
        '75': 'k',
        '76': 'l',
        '77': 'm',
        '78': 'n',
        '79': 'o',
        '80': 'p',
        '81': 'q',
        '82': 'r',
        '83': 's',
        '84': 't',
        '85': 'u',
        '86': 'v',
        '87': 'w',
        '88': 'x',
        '89': 'y',
        '90': 'z',
        '91': 'leftwindow',
        '92': 'rightwindow',
        '93': 'select',
        '96': '0',
        '97': '1',
        '98': '2',
        '99': '3',
        '100': '4',
        '101': '5',
        '102': '6',
        '103': '7',
        '104': '8',
        '105': '9',
        '106': 'multiply',
        '107': 'plus',
        '108': 'lowercase',
        '109': 'minus',
        '110': 'period',
        '111': 'divide',
        '112': 'f1',
        '113': 'f2',
        '114': 'f3',
        '115': 'f4',
        '116': 'f5',
        '117': 'f6',
        '118': 'f7',
        '119': 'f8',
        '120': 'f9',
        '121': 'f10',
        '122': 'f11',
        '123': 'f12',
        '124': 'f13',
        '125': 'f14',
        '126': 'f15',
        '144': 'numlock',
        '145': 'scrolllock',
        '175': 'updpad',
        '176': 'downdpad',
        '177': 'leftdpad',
        '178': 'rightdpad',
        '191': 'slash'
    };

    const KEYS = Keys;

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
        e.preventDefault();
        e.stopPropagation();
      },

      /**
       * 根据keycode对应表获得对应的str
       */
      getShortcut: (e) => {
        let shortcut = '';
        if (e.altKey) {
          shortcut += shortcut ? '+alt' : 'alt';
        }
        if (e.ctrlKey) {
          shortcut += shortcut ? '+ctrl' : 'ctrl';
        }
        if (e.shiftKey) {
          shortcut += shortcut ? '+shift' : 'shift';
        }
        if (e.metaKey) {
          shortcut += shortcut ? '+window' : 'window';
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
    };

    //提供交易中组件注册热键的方法

    /**
    * 注册热键
    *
    */
    function $setHotkey (vm, key, fn) {
      if (!vm) {
        console.log("vue实例不存在");
        return
      }
      if(keyUtils.isHTMLElement(vm)){
        vm = keyUtils.getClosestVueInstance(vm);
      }
      let keyLowerCase = key.toLocaleLowerCase().replace(/\s/g, '');
      fn = fn.bind(this);
      let hotkeyData = {
        key: keyLowerCase,
        fn: fn,
      };
      let hasSameKey = false;
      if (!vm.hasOwnProperty('keymap')) {
        vm['keymap'] = [];
      } else {
        vm['keymap'].forEach((item) => {
          if (item.key == keyLowerCase) {
            hasSameKey = true;
            item.fn = fn; //如果有相同的方法，后注册的覆盖先注册的
            return
          }
        });
      }
      if (!hasSameKey) {
        vm['keymap'].push(hotkeyData);
      }
    }


    /**
     * 删除热键
     *
     */
    function $delHotkey (vm, key) {
      if (!vm) {
        console.log("vue实例不存在");
        return
      }
      if(keyUtils.isHTMLElement(vm)){
        vm = keyUtils.getClosestVueInstance(vm);
      }
      let keyLowerCase = key.toLocaleLowerCase().replace(/\s/g, '');
      if (vm.hasOwnProperty('keymap')) {
        vm['keymap'].forEach((item, index) => {
          if (keyUtils.isEqual(item.key, keyLowerCase)) {
            vm['keymap'].splice(index, 1);
          }
        });
      }
    }

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

      let shortcut = keyUtils.getShortcut(e);
      let active = document.activeElement;
      let activeVueComponet = keyUtils.getClosestVueInstance(active) || window;


      matchMap(activeVueComponet);

      function matchMap (vm) {

        if (!vm) return
        if (vm.hasOwnProperty('keymap')) {
          let keymap = vm.keymap;
          for (let i = 0; i < keymap.length; i++) {
            if (keyUtils.isEqual(keymap[i].key, shortcut)) {
              keymap[i].fn(e);
              keyUtils.stopEvent(e);
              return
            }
          }
        }
        matchMap(vm.$parent);
      }
    }

    const hotkeyManager = {

      install (Vue) {
        registerKeydown();
        registerKeyup();
        Vue.prototype.$setHotkey = $setHotkey;
        Vue.prototype.$delHotkey = $delHotkey;
      }
    };

    return hotkeyManager;

});
