
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {barChartData : [], collerPalette: {},doughnutChartData: {}, tableData:{}, tabs: []};

export const loadInitialDataThunk = createAsyncThunk( "dashBoard/getInitialState", async (arg, thankAPI) => {
    try {

        let responses = await  axios.get(`http://localhost:8100/tabs`);

        thankAPI.dispatch(initialLoad(responses?.data)) 
    } catch (error) {
      thankAPI.dispatch(initialLoad([]))   
    }
} )  

export const chartsDataLoadThunk = createAsyncThunk( "dashBoard/loadChart", async (arg, thankAPI) => {
    try {
        let responses = await  axios.get(`http://localhost:8100/api${arg}?`);

        return responses.data.data;
    } catch (error) {
      thankAPI.dispatch(clearData([]))   
    }
} )

const dashBoardSlice = createSlice({
     name : 'dashBoard',
     initialState : INITIAL_STATE,
     reducers : {
        initialLoad : (state,action) => {
            state.tabs = action.payload.tabs? [...action.payload.tabs] : []
        },
        clearData: (state) => {
            state.barChartData = []
            state.collerPalette = {}
            state.doughnutChartData = {}
            state.tableData = {}
        }
     },
     extraReducers: (builder) => {
        builder
            .addCase(chartsDataLoadThunk.fulfilled, (state, action) => {
                state.barChartData = action.payload.barChartData? [...action.payload.barChartData] : [];
                state.collerPalette = action.payload.collerPalette? {...action.payload.collerPalette} : {};
                state.doughnutChartData = action.payload.doughnutData? {...action.payload.doughnutData} : {};
                state.tableData = action.payload.tableData? {...action.payload.tableData} : {};
            })
     }
})

export const dashBoardReducer = dashBoardSlice.reducer;
export const {initialLoad} = dashBoardSlice.actions;

