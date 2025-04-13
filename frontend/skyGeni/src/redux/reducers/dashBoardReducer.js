
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
        let paths = ["barChart","collerPalette","doughnutChart","tableData"];
        let reqs = paths.map(path => axios.get(`http://localhost:8100/api${arg}/${path}`));
        let responses = await Promise.all(reqs);

        let finalData = responses.reduce((acc, res) => {
            let path = res.data?.url?.split("/")?.pop();
            acc[path] = res.data.data;
            return acc;
        },{});

        return finalData;
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
                state.barChartData = action.payload.barChart? [...action.payload.barChart] : [];
                state.collerPalette = action.payload.collerPalette? {...action.payload.collerPalette} : {};
                state.doughnutChartData = action.payload.doughnutChart? {...action.payload.doughnutChart} : {};
                state.tableData = action.payload.tableData? {...action.payload.tableData} : {};
            })
     }
})

export const dashBoardReducer = dashBoardSlice.reducer;
export const {initialLoad} = dashBoardSlice.actions;

