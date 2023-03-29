import { configureStore } from '@reduxjs/toolkit'
import shipsListSlice from "./reducers/shipsList-reducer"
import singleShipSlice from "./reducers/singleShip-reducer"
export const store = configureStore({
    reducer: {
        shipsList: shipsListSlice,
        singleShip: singleShipSlice,
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch