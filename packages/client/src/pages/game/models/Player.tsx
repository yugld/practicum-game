import { CardType } from "../types"

export interface UserType {id: number, name: string}
export default class Player {
    user: UserType
    isProtect = false
    numberOfTokens: number
    cardOnHand: CardType | null

    constructor(props: { user: UserType}){
        this.user = props.user
        this.numberOfTokens = 0
        this.cardOnHand = null
    }
}
