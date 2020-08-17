# vue-hotkey-manager

&gt; Set and delete hotkeys in Vue project
## Install

``` 
npm install vue-hotkey-manager
``` 

## Usage

``` 
import Vue from 'vue'
import hotkey from 'vue-hotkey-manager'
Vue.use(hotkey)
``` 
###example

``` 
<template>
	<el-input ref='input_1'></el-input>
</template>
``` 

-  __setHotkey__ 

``` 
this.$setHotkey(this.$refs['input_1'],'ctrl+m',
function(){
	//TODO
})

``` 
The first parameter requirement for the method is `Vnode`, If you set in a `DOM` element, the hotkey is bound to the upper `Vnode`

-  __delHotkey__ 

``` 
this.$delHotkey(this.$refs['input_1'],'ctrl+m')
``` 