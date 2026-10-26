import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface VenueItem {
  name: string;
  capacity: number;
  cost: number;
  img: string;
  quantity: number;
}

const initialState: VenueItem[] = [
  {
    name: 'Conference Room (Capacity:15)',
    capacity: 15,
    cost: 1500,
    img: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=600&q=80',
    quantity: 0,
  },
  {
    name: 'Auditorium Hall (Capacity:200)',
    capacity: 200,
    cost: 5500,
    img: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=600&q=80',
    quantity: 0,
  },
  {
    name: 'Presentation Room (Capacity:50)',
    capacity: 50,
    cost: 3500,
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80',
    quantity: 0,
  },
  {
    name: 'Large Meeting Room (Capacity:10)',
    capacity: 10,
    cost: 1000,
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    quantity: 0,
  },
  {
    name: 'Small Meeting Room (Capacity:5)',
    capacity: 5,
    cost: 800,
    img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
    quantity: 0,
  },
];

export const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state[index]) {
        state[index].quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
    resetVenue: (state) => {
      state.forEach((item) => {
        item.quantity = 0;
      });
    },
  },
});

export const { incrementQuantity, decrementQuantity, resetVenue } = venueSlice.actions;
export default venueSlice.reducer;
