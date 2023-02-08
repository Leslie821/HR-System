import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import {
  getLocalStorage,
  clearLocalStorage,
  JWTPayload,
} from "../localStorage";

export interface UserState {
  user: {
    id: number;
    email: string;
    name: string;
    access_level_id: number;
  } | null;
}

const initialState: UserState = {
  user: getLocalStorage(),
};

const loginSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login(state) {
      state.user = getLocalStorage();
    },
    loginOut() {
      clearLocalStorage();
    },
  },
});

export const { login, loginOut } = loginSlice.actions;

export default loginSlice.reducer;
