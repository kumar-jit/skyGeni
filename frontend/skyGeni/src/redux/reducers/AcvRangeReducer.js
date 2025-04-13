
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {barChartData : [], collerPalette: {},doughnutChartData: {}, tableData:{}};

export const acvRangeReducerInitialLoadThunk = createAsyncThunk( "acvRange/getInitialState", async (arg, thankAPI) => {
    try {
        let paths = ["barChart","collerPalette","doughnutChart","tableData"];
        let reqs = paths.map(path => axios.get(`http://localhost:8100/api/acvRange/${path}`));
        let responses = await Promise.all(reqs);

        let finalData = responses.reduce((acc, res) => {
            let path = res.data?.url?.split("/")?.pop();
            acc[path] = res.data.data;
            return acc;
        },{});

        thankAPI.dispatch(initialLoad(finalData)) 
    } catch (error) {
      thankAPI.dispatch(initialLoad([]))   
    }
} )

const acvRangeSlice = createSlice({
     name : 'acvRange',
     initialState : INITIAL_STATE,
     reducers : {
        initialLoad : (state,action) => {
            state.barChartData = action.payload.barChart? [...action.payload.barChart] : [];
            state.collerPalette = action.payload.collerPalette? {...action.payload.collerPalette} : {};
            state.doughnutChartData = action.payload.doughnutChart? {...action.payload.doughnutChart} : {};
            state.tableData = action.payload.tableData? {...action.payload.tableData} : {};
        }
     },
})

export const acvRangeReducer = acvRangeSlice.reducer;
export const {initialLoad} = acvRangeSlice.actions;

// export const acvRangeSelector = (state) => state.acvRangeReducer;