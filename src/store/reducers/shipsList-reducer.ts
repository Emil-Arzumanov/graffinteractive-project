import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {IShips} from "../../models/IShips";
//Thunks
export const getAllShips = createAsyncThunk(
    'ships/getAllShips',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IShips[]>('https://api.spacexdata.com/v3/ships')
            thunkAPI.dispatch(combineAllFilters());
            thunkAPI.dispatch(setMaxPages());
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
const isSearchEqualName = (name: string, filterName: string) => {
    if (filterName === '') return true;
    if (filterName.length > name.length) return false;
    for (let i=0;i < filterName.length;i++) {
        if (filterName[i] !== name[i]) return false;
    }
    return true;
}
const isPortEqualFilter = (chosenPorts:string[],port: string) => {
    if (chosenPorts.length === 0) return true;
    for (let i=0;i < chosenPorts.length;i++) {
        if (chosenPorts[i] === port) return true;
    }
    return false;
}
const isTypeEqualFilter = (elementType: string, chosenType: string) => {
    if (chosenType === "All") return true;
    return elementType === chosenType
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
    searchFilter: string,
    chosenPorts: string[],
    shipTypeFilter: string,
}

const initialState: initState = {
    isLoading: false,
    error: '',
    ships: [],
    filteredShips: [],
    currentPage: 1,
    maxPages: 0,
    pageSize: 5,
    isFilterOpen: false,
    isSelectorOpen: false,
    searchFilter: '',
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
        setMaxPages(state) {
            state.maxPages = Math.ceil((state.filteredShips.length) / state.pageSize);
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
        updateSearchFilter(state, action: PayloadAction<string>) {
            state.searchFilter = action.payload;

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
        },
        combineAllFilters(state) {
            state.filteredShips = [];
            for (let i=0;i < state.ships.length;i++) {
                if (isSearchEqualName(state.ships[i].ship_name, state.searchFilter)
                    && isPortEqualFilter(state.chosenPorts, state.ships[i].home_port)
                    && isTypeEqualFilter(state.ships[i].ship_type,state.shipTypeFilter)) {
                    state.filteredShips.push(state.ships[i]);
                }
            }
        }
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
    setMaxPages,
    openFilter,
    closeFilter,
    updateSelector,
    updateSearchFilter,
    chosePort,
    updateShipTypeFilter,
    combineAllFilters
} = shipsListSlice.actions

export default shipsListSlice.reducer