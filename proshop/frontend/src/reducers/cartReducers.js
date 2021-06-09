import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      // If the selected product is in our current state (which is from the backend) then it exist
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        // if true return the item where true or return the product in the iteration thats not true
        return {
          ...state,   // The state has a lot of other things in it as well besides the cartItems which is why it too is returned
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x  // this makes sure we put both new items and old items 
          ),                                            // in cart
        }
      } else {  // else just return the new item
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}
