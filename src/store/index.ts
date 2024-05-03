import { configureStore } from "@reduxjs/toolkit";

import { amountSliceReducer } from "./features/gameSlice";

export const store = configureStore({
  reducer: {
    gameData: amountSliceReducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;
