
import { Type } from './actionTypes'; // Ensure this path is correct

export const initialstate = {
  basket: [],
  user:null
};

export const reducer = (state, action) => {
  console.log('Reducer called with state:', state);
  console.log('Reducer called with action:', action);

  // switch (action.type) {
  //   case Type.ADD_TO_BASKET:
  //     const existingItemIndex = state.basket.findIndex((item) => item.id === action.item.id);
  // console.log("existingItemIndex >>",existingItemIndex );
  //     if (existingItemIndex !== -1) {
  //       // Item exists in basket, update its amount
  //       const updatedBasket = [...state.basket];
  //       updatedBasket[existingItemIndex].amount += 1;

  //       console.log('Updated basket:', updatedBasket);

  //       return {
  //         ...state,
  //         basket: updatedBasket,
  //       };
  //     } else {
  //       // Item does not exist in basket, add it with amount 1
  //       const newBasket = [...state.basket, { ...action.item, amount: 1 }];
  //       console.log('New basket:', newBasket);

  //       return {
  //         ...state,
  //         basket: newBasket,
  //       };
  //     }
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingitem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingitem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        return {
          ...state,
          basket: updatedBasket,
        };
      }

    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      if (index >= 0) {
        let newBasket = [...state.basket];
        if (newBasket[index].amount > 1) {
          // Decrease amount if greater than 1
          newBasket[index] = { ...newBasket[index], amount: newBasket[index].amount - 1 };
        } else {
          // Remove item if amount is 1
          newBasket.splice(index, 1);
        }
        console.log('Basket after removal:', newBasket);
        return {
          ...state,
          basket: newBasket,
        };
      }
      return state; // Return current state if item not found







      case Type.SET_USER:
        return{

        ...state,
        user:action.user
      }

    default:
      return state;
  }
};
