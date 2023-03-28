import { configureStore } from '@reduxjs/toolkit'
import shipsListSlice from "./reducers/shipsList-reducer"
export const store = configureStore({
    reducer: {
        shipsList: shipsListSlice,
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch