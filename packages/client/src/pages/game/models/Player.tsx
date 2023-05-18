import { CardType } from '../types'
import { IUser } from '../../../api/types'

export interface UserType {
  id: number
  name: string
}
export default class Player {
  user: IUser
  isProtect = false
  numberOfTokens: number
  cardOnHand: CardType | null

  constructor(props: { user: IUser; cardOnHand?: CardType }) {
    this.user = props.user
    this.numberOfTokens = 0
    this.cardOnHand = props.cardOnHand || null
  }
}
