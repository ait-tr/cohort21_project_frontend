import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CategoriesState from './types/CategoriesState';
import * as api from './api';
import Category, { CategoryId } from './types/Category';

const initialState: CategoriesState = {
  categories: [],
  error: undefined,
};

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async ({ title, description }: { title: string; description: string }) => {
    if (!title.trim()) {
      throw new Error('Название категории не должно быть пустым');
    }
    return api.createCategory(title, description);
  }
);

export const loadCategories = createAsyncThunk('categories/loadCategories', () =>
  api.getCategories()
);

export const loadCategoriesOfAll = createAsyncThunk(
  'categories/loadCategoriesOfAll',
  () => api.getCategoriesOfAll()
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, updatedCategory }: { id: CategoryId; updatedCategory: Category }) => {
    await api.updateCategory(id, updatedCategory);
    return { id, updatedCategory };
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        const { id, updatedCategory } = action.payload;
        state.categories = state.categories.map((category) =>
          category.id === id ? { ...category, ...updatedCategory } : category
        );
      });
  },
});

export const { resetError } = categoriesSlice.actions;

export default categoriesSlice.reducer;
