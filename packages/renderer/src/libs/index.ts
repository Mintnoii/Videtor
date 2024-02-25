import mitt, { Emitter } from 'mitt'

const enum KonvaEventName {
  InitNodes = 'InitNodes',
  SetActiveNodes = 'SetActiveNodes',
  UpdateNodes = 'UpdateNodes',
  UpdateActiveNodes = 'UpdateActiveNodes'
}

export type IKonvaEventName = keyof typeof KonvaEventName
export type IKonvaEventEmitter = Emitter<Record<IKonvaEventName, any>>
const konvaEventEmitter: IKonvaEventEmitter = mitt()
const EventEmitter = mitt
export { KonvaEventName, EventEmitter, konvaEventEmitter }