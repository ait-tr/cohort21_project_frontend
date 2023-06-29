import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SubcategoriesState from "./types/SubcategoriesState";
import * as api from './api';

const initialState: SubcategoriesState = {
    subcategories: [],
    error: undefined,
};

export const loadSubcategories = createAsyncThunk('subcategories/loadSubcategories', () => 
api.getSubcategories()
);

const subcategoriesSlice = createSlice({
    name: 'subcategories',
    initialState,
    reducers:{
        resetError: (state) => {
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadSubcategories.rejected, (state) => {
            state.error = 'Нет подкатегорий';
        })
        .addCase(loadSubcategories.fulfilled, (state, action) => {
            state.subcategories=action.payload.subcategories;
        });
    },
});

export const {resetError} = subcategoriesSlice.actions;

export default subcategoriesSlice.reducer;

