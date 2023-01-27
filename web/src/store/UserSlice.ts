import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  data: string[];
}

const initialState: UserState = {
  data: [],
};

const todoSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addItem(state: UserState, action: PayloadAction<string>) {
      state.data.push(action.payload);
    },
  },
});

export const { addItem } = todoSlice.actions;
export default todoSlice.reducer;
