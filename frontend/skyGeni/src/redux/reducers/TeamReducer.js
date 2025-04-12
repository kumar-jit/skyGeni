import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {barChartData : [], collerPalette: {},doughnutChartData: {}};

export const teamReducerInitialLoadThunk = createAsyncThunk( "team/getInitialState", async (arg, thankAPI) => {
    try {
        let paths = ["barChart","collerPalette","doughnutChart"];
        let reqs = paths.map(path => axios.get(`http://localhost:8100/api/team/${path}`));
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

const teamSlice = createSlice({
     name : 'team',
     initialState : INITIAL_STATE,
     reducers : {
        initialLoad : (state,action) => {
            state.barChartData = action.payload.barChart? [...action.payload.barChart] : [];
            state.collerPalette = action.payload.collerPalette? {...action.payload.collerPalette} : {};
            state.doughnutChartData = action.payload.doughnutChart? {...action.payload.doughnutChart} : {};
        }
     },
})

export const teamReducer = teamSlice.reducer;
export const {initialLoad} = teamSlice.actions;

// export const teamSelector = (state) => state.teamReducer;