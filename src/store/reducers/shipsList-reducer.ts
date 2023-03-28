import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {IShips} from "../../models/IShips";

export const getAllShips = createAsyncThunk(
    'ships/getAllShips',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IShips[]>('https://api.spacexdata.com/v3/ships')
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить корабли")
        }
    }
)

interface initState {
    isLoading: boolean,
    error: string,
    ships: IShips[],
}

const initialState: initState = {
    isLoading: false,
    error: '',
    ships: []
}

const shipsListSlice = createSlice({
    name: "ships",
    initialState,
    reducers: {
        increment(state, action:PayloadAction<initState>) {

        }
    },
    extraReducers: {
        [getAllShips.fulfilled.type]: (state, action: PayloadAction<IShips[]>) => {
            state.isLoading = false;
            state.error = ''
            state.ships = action.payload;
        },
        [getAllShips.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getAllShips.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
});

export const {
    increment
} = shipsListSlice.actions

export default shipsListSlice.reducer