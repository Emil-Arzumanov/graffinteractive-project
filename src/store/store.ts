import { configureStore } from '@reduxjs/toolkit'
import shipListSlice from "./reducers/shipsList-reducer"
export const store = configureStore({
    reducer: {
        shipList: shipListSlice,
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch