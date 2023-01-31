import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import {
  getLocalStorage,
  clearLocalStorage,
  JWTPayload,
} from "../localStorage";
import { Form } from "react-router-dom";

export interface UserState {
  user: {
    id: number;
    email: string;
    access_level_id: number;
    token: string;
  } | null;
}

const initialState: UserState = {
  user: getLocalStorage(),
};

const loginSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login(state: UserState, action: PayloadAction<{ token: string }>) {
      if (action.payload) {
        let decode: JWTPayload = jwtDecode(action.payload.token);
        state.user = {
          id: decode.id,
          email: decode.email,
          access_level_id: decode.access_level_id,
          token: action.payload.token,
        };
      } else {
        console.log();
      }
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
