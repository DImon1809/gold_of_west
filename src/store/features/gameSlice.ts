import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IinitialState {
  amount: number;
  initialFactor: number;
  deposit: number;
  lose: boolean;
  cheatMode: boolean;
  countCell: number;
}

const initialState: IinitialState = {
  amount: 0,
  initialFactor: 0,
  deposit: 0,
  lose: false,
  cheatMode: false,
  countCell: 0,
};

export const gameSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },

    changeAmount: (state, action: PayloadAction<number>) => {
      state.amount -= action.payload;
    },

    increaseAmount: (state, action: PayloadAction<number>) => {
      state.amount += action.payload;
    },

    setInitialFactor: (state, actions: PayloadAction<number>) => {
      state.initialFactor = actions.payload;
    },

    setDeposit: (state, action: PayloadAction<number>) => {
      state.deposit = action.payload;
    },

    changeDeposit: (state, action: PayloadAction<number>) => {
      state.deposit = action.payload;
    },

    changeLose: (state, action: PayloadAction<boolean>) => {
      state.lose = action.payload;
    },

    changeCheatMode: (state) => {
      state.cheatMode = !state.cheatMode;
    },

    changeCountCell: (state, action: PayloadAction<number>) => {
      state.countCell = action.payload;
    },
  },
});

export const {
  setAmount,
  setInitialFactor,
  setDeposit,
  changeAmount,
  increaseAmount,
  changeDeposit,
  changeLose,
  changeCheatMode,
  changeCountCell,
} = gameSlice.actions;
export const amountSliceReducer = gameSlice.reducer;
