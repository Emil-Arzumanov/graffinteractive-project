import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {IShips} from "../../models/IShips";

export const getShipById = createAsyncThunk(
    'ships/getShipById',
    async (ship_id: string | null, thunkAPI) => {
        try {
            const response = await axios.get<IShips>(`https://api.spacexdata.com/v3/ships/${ship_id}`)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить корабли")
        }
    }
)

interface initState {
    isLoading: boolean,
    error: string,
    ship: IShips,
}

const initialState: initState = {
    isLoading: false,
    error: '',
    ship: {
        ship_id: '',
        ship_name: '',
        ship_type: '',
        weight_kg: 0,
        home_port: '',
        year_built: 0,
        missions: [],
    }
}

const singleShipSlice = createSlice({
    name: "singleShip",
    initialState,
    reducers: {
        clearShipData(state) {
            state.ship = {
                ship_id: '',
                ship_name: '',
                ship_type: '',
                weight_kg: 0,
                home_port: '',
                year_built: 0,
                missions: [],
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getShipById.fulfilled.type, (state,action:PayloadAction<IShips>) => {
            state.isLoading = false;
            state.error = ''
            state.ship = action.payload;
        })
        builder.addCase(getShipById.pending.type, (state ) => {
            state.isLoading = true;
        })
        builder.addCase(getShipById.rejected.type, (state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        })
    },
});

export const {
    clearShipData
} = singleShipSlice.actions

export default singleShipSlice.reducer