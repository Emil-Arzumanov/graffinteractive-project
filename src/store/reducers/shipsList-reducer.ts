import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {IShips} from "../../models/IShips";

export const getAllShips = createAsyncThunk(
    'ships/getAllShips',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IShips[]>('https://api.spacexdata.com/v3/ships')
            thunkAPI.dispatch(setMaxPages(response.data.length))
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить данные корабля")
        }
    }
)

interface initState {
    isLoading: boolean,
    error: string,
    ships: IShips[],
    currentPage: number,
    maxPages: number,
    pageSize: number,
}

const initialState: initState = {
    isLoading: false,
    error: '',
    ships: [],
    currentPage: 1,
    maxPages: 5,
    pageSize: 5,
}

const shipsListSlice = createSlice({
    name: "ships",
    initialState,
    reducers: {
        nextPage(state) {
            if (state.currentPage < state.maxPages)
                state.currentPage += 1;
        },
        previousPage(state) {
            if (state.currentPage > 1)
                state.currentPage -= 1;
        },
        setMaxPages(state, action:PayloadAction<number>) {
            state.maxPages = Math.ceil((action.payload) / state.pageSize);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllShips.fulfilled.type, (state,action:PayloadAction<IShips[]>) => {
            state.isLoading = false;
            state.error = ''
            state.ships = action.payload;
        })
        builder.addCase(getAllShips.pending.type, (state ) => {
            state.isLoading = true;
        })
        builder.addCase(getAllShips.rejected.type, (state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        })
    },
});

export const {
    nextPage,
    previousPage,
    setMaxPages
} = shipsListSlice.actions

export default shipsListSlice.reducer