export interface CardType {
    title: string
    count: number
    value: number
    text: string
    imgSrc: (theme: string) => string
}
export enum ResultMessageTypeEnum {
    success = 'success',
     info = 'info',
     error = 'error'
 }
export interface ResultMessageType {
    type: ResultMessageTypeEnum,
    text: string
}

export enum GameProgress {
    'choice' = 'choice',
    'waiting' = 'waiting',
    'action' = 'action',
    'confirm' = 'confirm'
}

export interface DimensionsType {
    width: number,
    height: number
}

export interface CoordinatesType {
    x: number
    y: number
}

export type AreaCardType = Record<'A' | 'B' | 'C' | 'D', CoordinatesType >
