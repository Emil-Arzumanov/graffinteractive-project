import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {IShips} from "../../models/IShips";
//Thunks
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
/** Helpers **/
export const checkIfChosen = (chosenPorts:string[],port: string) => {
    for (let i=0;i < chosenPorts.length;i++) {
        if (chosenPorts[i] === port) return true;
    }
    return false;
}
/***/
interface initState {
    isLoading: boolean,
    error: string,
    ships: IShips[],
    filteredShips: IShips[],
    currentPage: number,
    maxPages: number,
    pageSize: number,
    isFilterOpen: boolean,
    isSelectorOpen: boolean,
    chosenPorts: string[],
    shipTypeFilter: string,
}

const initialState: initState = {
    isLoading: false,
    error: '',
    ships: [],
    filteredShips: [],
    currentPage: 1,
    maxPages: 5,
    pageSize: 5,
    isFilterOpen: false,
    isSelectorOpen: false,
    chosenPorts: [],
    shipTypeFilter: 'All',
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
        openFilter(state) {
            state.isFilterOpen = true
        },
        closeFilter(state) {
            state.isFilterOpen = false
        },
        updateSelector(state) {
            state.isSelectorOpen = !state.isSelectorOpen
        },
        chosePort(state, action: PayloadAction<string>) {
            if (checkIfChosen(state.chosenPorts, action.payload)) {
                state.chosenPorts = state.chosenPorts.filter(word => word !== action.payload);
            } else {
                state.chosenPorts.push(action.payload)
            }
        },
        updateShipTypeFilter(state, action: PayloadAction<string>) {
            if (state.shipTypeFilter === action.payload) {
                state.shipTypeFilter = "All"
            } else {
                state.shipTypeFilter = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllShips.fulfilled.type, (state,action:PayloadAction<IShips[]>) => {
            state.isLoading = false;
            state.error = ''
            state.ships = action.payload;
            state.filteredShips = action.payload;
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
    setMaxPages,
    openFilter,
    closeFilter,
    updateSelector,
    chosePort,
    updateShipTypeFilter
} = shipsListSlice.actions

export default shipsListSlice.reducer