/*
 * @Author: fg
 * @Date: 2022-07-06 17:51:28
 * @LastEditors: fg
 * @LastEditTime: 2022-07-07 15:57:09
 * @Description: v-model type add
 */

export interface StepPrototype {
  target: any
  subs: any[]
  addSub(sub: any): void
  update(): void
}

export interface StepThis {
  subs: Array<any>
  addSub(sub: any): void
  update(): void
}

export interface VueOptions {
  el: string;
  data: object;
}