import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SubcategoriesState from './types/SubcategoriesState';
import * as api from './api';

const initialState: SubcategoriesState = {
  subcategories: [],
  error: undefined,
};

export const loadSubcategories = createAsyncThunk(
  'subcategories/loadSubCategories',
  () => api.getSubcategories()
);

export const createSubCategory = createAsyncThunk(
  'categories/createSubCategory',
  async ({
    title,
    description,
    categoryId,
  }: {
    title: string;
    description: string;
    categoryId: number;
  }) => {
    if (!title.trim() || !description.trim()) {
      throw new Error('Заголовок задачи и описание не должны быть пустыми');
    }
    return api.createSubCategory(title, description, categoryId);
  }
);

const subcategoriesSlice = createSlice({
  name: 'subcategories',
  initialState,
  reducers: {
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
        state.subcategories = action.payload.subcategories;
      })

      .addCase(createSubCategory.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.subcategories.push(action.payload);
      });
  },
});

export const { resetError } = subcategoriesSlice.actions;

export default subcategoriesSlice.reducer;
