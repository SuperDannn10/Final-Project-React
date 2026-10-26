import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AvItem {
  name: string;
  cost: number;
  img: string;
  quantity: number;
}

const initialState: AvItem[] = [
  {
    name: 'Projectors',
    cost: 200,
    img: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
    quantity: 0,
  },
  {
    name: 'Speaker',
    cost: 35,
    img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    quantity: 0,
  },
  {
    name: 'Microphones',
    cost: 45,
    img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    quantity: 0,
  },
  {
    name: 'Whiteboards',
    cost: 80,
    img: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=600&q=80',
    quantity: 0,
  },
  {
    name: 'Signage',
    cost: 80,
    img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    quantity: 0,
  },
];

export const avSlice = createSlice({
  name: 'av',
  initialState,
  reducers: {
    incrementAvQuantity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state[index]) {
        state[index].quantity++;
      }
    },
    decrementAvQuantity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
    resetAv: (state) => {
      state.forEach((item) => {
        item.quantity = 0;
      });
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity, resetAv } = avSlice.actions;
export default avSlice.reducer;
