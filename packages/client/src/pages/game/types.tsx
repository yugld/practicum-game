export interface CardType {
  title: string
  count: number
  value: number
  text: string
  imgSrc: string
}
export enum ResultMessageTypeEnum {
  success = 'success',
  info = 'info',
  error = 'error',
}
export interface ResultMessageType {
  type: ResultMessageTypeEnum
  text: string
}

export enum GameProgress {
  choice = 'choice',
  waiting = 'waiting',
  action = 'action',
  confirm = 'confirm',
  viewCard = 'viewCard',
  finishRound = 'finishRound',
  waitingConfirm = 'waitingConfirm',
}

export interface DimensionsType {
  width: number
  height: number
}

export interface CoordinatesType {
  x: number
  y: number
}

export type AreaCardType = Record<'A' | 'B' | 'C' | 'D', CoordinatesType>

export interface IEventListener {
  element: HTMLElement
  eventName: string
  foo: (evn: Event) => void
}
