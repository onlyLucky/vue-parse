<div align="center">
  <h1>vue数据双向绑定</h1>
  <p>vue 双向数据绑定是通过数据劫持结合发布订阅模式的方式来实现的， 也就是说数据和视图同步，数据发生变化，视图跟着变化，视图变化，数据也随之发生改变；</p>
</div>

## 目录

- [目录](#目录)
- [简介](#简介)
- [MVVM](#mvvm)
- [需求实现](#需求实现)
  - [1.绑定过程](#1绑定过程)
  - [2.实现 view -> model](#2实现-view---model)
  - [3.实现 model -> view](#3实现-model---view)
- [总结](#总结)

## 简介

**简单分析需求：** 其实我们想得到的是数据改变，直接通知 dom 去修改，视图上面的数据更改，本身的数据 data 也会进行更新

所以需要最重要的是中间层如何进行监测。

- **双向数据绑定是通过数据劫持结合发布订阅模式的方式来实现的**

- 其中的核心是：**Object.defineProperty()**

## MVVM

MVVM 模式在 Vue.js 中 ViewModel 是如何和 View 以及 Model 进行交互的

[![jtd79S.png](https://s1.ax1x.com/2022/07/05/jtd79S.png)](https://imgtu.com/i/jtd79S)

## 需求实现

### 1.绑定过程

- 如何绑定要input上,如何绑定要文本节点中
- DocumentFragment里面，然后对每一个节点进行处理，看是不是有跟vm实例中有关联的内容，如果有，**修改这个节点的内容**。然后重新添加入DocumentFragment中
- 我们需要一个处理每个节点的函数，如果有input绑定v-model属性或者有{{ xxx }}的文本节点出现，就进行内容替换，**替换为vm实例中的data中的内容**
- 向碎片化文档中添加节点时，每个节点都处理一下
- 创建Vue的实例化函数，就成功将内容都绑定到了输入框与文本节点上


### 2.实现 view -> model

### 3.实现 model -> view


## 总结

- `/`与`./`的区别是，前者为根目录，后者为相对目录（可以查看 index.html svg meta 菜单图标资源地址配置）

- 碎片化文档（[DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)）是一个保存多个 element 的容器对象（保存在内存）当更新其中的一个或者多个 element 时，页面不会更新。只有当 documentFragment 容器中保存的所有 element 更新后再将其插入到页面中才能更新页面。(这个是为了减少dom回流的次数)
- appendChid 方法将原 dom 树中的节点添加到 DocumentFragment 中时，会删除原来的节点。
