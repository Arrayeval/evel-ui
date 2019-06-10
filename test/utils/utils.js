import Vue from 'vue';

import EvelUI from '../../src/index'
Vue.use(EvelUI);
let  id = 0

const createElm = function () {
    const elm = document.createElement("div")
    elm.id = "app" + ++id
    document.body.appendChild(elm)
    return elm
}


/**
 * 回收 vm
 * @param  {Object} vm
 */
export const destroyVM = function(vm) {
    vm.$destroy && vm.$destroy();
    vm.$el &&
    vm.$el.parentNode &&
    vm.$el.parentNode.removeChild(vm.$el);
  };


/**
 * 创建一个组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 **/
export const createTest = function(Compo, propsData = {}, mounted = false) {
    if (propsData === true || propsData === false) {
      mounted = propsData;
      propsData = {};
    }
    const Ctor = Vue.extend(Compo);
    return new Ctor({ propsData }).$mount(mounted === false ? null : createElm());
};

/**
 * 创建一个Vue 的实例对象
 * @param  {Object|String}  Compo   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
export const createVue = function(Compo, mounted = false) {
    if (Object.prototype.toString.call(Compo) === '[object String]') {
      Compo = { template: Compo }; // template 需要编译器，故使用的是完整版 ''vue/dist/vue.esm.js''
    }
    return new Vue(Compo).$mount(mounted === false ? null : createElm());
  };