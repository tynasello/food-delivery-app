import * as thirty from '../assets/image/30.png'
import * as thirtyone from '../assets/image/31.png'
import * as thirtytwo from '../assets/image/32.png'
import * as thirtythree from '../assets/image/33.png'
import * as thirtyfour from '../assets/image/34.png'
import * as thirtyfive from '../assets/image/35.png'
import * as thirtysix from '../assets/image/36.png'
import * as thirtyseven from '../assets/image/37.png'
import * as thirtyeight from '../assets/image/38.png'
import * as thirtynine from '../assets/image/39.png'
import * as any from '../assets/image/any.png'
import * as burgers from '../assets/image/burgers.png'
import * as chicken from '../assets/image/chicken.png'
import * as Debit from '../assets/image/debit.png'
import * as PayPal from '../assets/image/paypal.png'
import * as sushi from '../assets/image/sushi.png'
import * as Visa from '../assets/image/visa.png'

export const getImage = (foodItemId: number | null | string) => {
  switch (foodItemId) {
    case 'Any':
      return any.default
    case 'Sushi':
      return sushi.default
    case 'Burgers':
      return burgers.default
    case 'Chicken':
      return chicken.default
    case 30:
      return thirty.default
    case 31:
      return thirtyone.default
    case 32:
      return thirtytwo.default
    case 33:
      return thirtythree.default
    case 34:
      return thirtyfour.default
    case 35:
      return thirtyfive.default
    case 36:
      return thirtysix.default
    case 37:
      return thirtyseven.default
    case 38:
      return thirtyeight.default
    case 39:
      return thirtynine.default
    default:
      return any.default
  }
}

export const getOptionImage = (optionName: string) => {
  switch (optionName) {
    case 'PayPal':
      return PayPal.default
    case 'Visa':
      return Visa.default
    case 'Debit':
      return Debit.default
    default:
      return PayPal.default
  }
}
