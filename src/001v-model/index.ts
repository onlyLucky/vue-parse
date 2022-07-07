/*
 * @Author: fg
 * @Date: 2022-07-04 11:31:48
 * @LastEditors: fg
 * @LastEditTime: 2022-07-07 16:59:57
 * @Description: 数据双向绑定入口
 */
import { StepPrototype, StepThis, VueOptions } from '../types/index'
const App = document.querySelector<HTMLDivElement>('.app')!

App.innerHTML = `<input type="text" v-model='msg'/>{{ msg }}<p>msg:</p>{{ msg }}`
let step: StepPrototype;
// 订阅集合
function Step(this: StepThis): void {
  this.subs = []
}

Step.prototype = {
  addSub(sub) {
    // 添加订阅
    this.subs.push(sub)
    console.log(this.subs, 'this.subs')
  },
  update() {
    // 更新订阅
    this.subs.forEach(sub => {
      //调用的是订阅者watch对象自身的update
      sub.update()
    });
  }
}

//获取当前app节点内部的所有子节点
function nodeToFragment(node: HTMLElement, vm: any): DocumentFragment {
  console.log(vm, 'vm')
  let fragment = document.createDocumentFragment()
  let child;
  while (child = node.firstChild) {
    compile(child, vm)
    fragment.appendChild(child)
  }
  return fragment
}

//编译节点的方法
function compile(node: HTMLElement, vm: any) {
  let reg = /\{\{(.*)\}\}/;//用来匹配{{xxx}}中的xxx
  console.log(node.nodeType, 'nodeType', node)
  // 如果是元素节点
  if (node.nodeType === 1) {
    let attr = node.attributes
    // 遍历所有属性节点
    for (let i = 0; i < attr.length; i++) {
      if (attr[i].nodeName == 'v-model') {
        let name = attr[i].nodeValue
        node.addEventListener('input', function (e: Event) {
          vm[name] = e.target.value
        })
        node.value = vm.data[name]
        node.removeAttribute('v-model')
      }
    }
    // 如果为文本
  } else if (node.nodeType === 3) {
    if (reg.test(node.nodeValue)) {
      let name = RegExp.$1.trim()
      console.log(name, node.nodeValue)
      // 创建监听
      new watch(vm, node, name)
    }
  }
}

// 监听属性变化的功能
function changeDate(obj: any, key: string, val: any) {
  step = new Step()
  Object.defineProperty(obj, key, {
    get() {
      // 添加订阅
      if (step.target) {
        step.addSub(step.target)
      }
      return val
    },
    set(newVal) {
      if (newVal != val) {
        val = newVal
        console.log('newVal:', newVal)
        step.update()
      }
    }
  })
}
// 这个观察者是对这个订阅集合进行遍历的
function observe(obj: object, vm: any) {
  for (let key of Object.keys(obj)) {
    changeDate(vm, key, obj[key])
  }
}

//创建监听  单独的订阅者

function watch(vm: any, node: HTMLElement, name) {
  step.target = this
  this.vm = vm
  // 这里会触发 Object.defineProperty get
  this.name = name
  this.node = node
  this.update()
  // 清空是为了下次进入初始化
  step.target = null;
}

watch.prototype = {
  update() {
    console.log(this, 'this---')
    this.get()
    this.node.nodeValue = this.value
  },
  get() {
    this.value = this.vm[this.name]
  }
}



// vue对象

function Vue(options: VueOptions) {
  this.data = options.data
  // 观察者
  console.log(this, 'this-observe')
  observe(this.data, this);
  let id = options.el.match(/(?<=#)\w+/)[0]
  // 获取当前节点
  let dom = nodeToFragment(document.getElementById(id), this)
  document.getElementById(id).appendChild(dom)
}

new Vue({
  el: '#App',
  data: {
    msg: 'hello world!!!'
  }
})
