/*
 * @Author: fg
 * @Date: 2022-07-04 11:31:48
 * @LastEditors: fg
 * @LastEditTime: 2022-07-05 11:17:36
 * @Description: 数据双向绑定入口
 */

const App = document.querySelector<HTMLDivElement>('.app')!

App.innerHTML = `
  <input type="text" id="ipt">
  <h3 id="txt"></h3>
`

