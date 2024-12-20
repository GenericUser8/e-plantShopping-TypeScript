import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootSlice } from './store';

export type Plant = {
  name: string,
  image: string,
  description: string,
  cost: string
};

export type CartPlant = {
  name: string,
  image: string,
  cost: string,
  quantity: number
};

export type CategorisedPlants = {
  category: string,
  plants: Plant[]
};

const initialState: { items: CartPlant[] } = {
  items: []
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Plant | CartPlant>) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (!existingItem) {
        state.items.push({ name, image, cost, quantity: 1 });
        return;
      }
      existingItem.quantity++;
    },
    removeItem: (state, action: PayloadAction<Plant | CartPlant>) => {
      const { name } = action.payload;
      state.items = state.items.filter(item => item.name !== name);
    },
    updateQuantity: (state, action: PayloadAction<CartPlant>) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) { itemToUpdate.quantity = quantity; }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
