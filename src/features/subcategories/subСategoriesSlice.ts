import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SubCategoriesState from './types/SubСategoriesState';
import * as api from './api';
import SubCategory, { SubCategoryId } from './types/SubСategory';

const initialState: SubCategoriesState = {
  subCategories: [],
  error: undefined,
};

export const loadSubCategories = createAsyncThunk(
  'subCategories/loadSubCategories',
  () => api.getSubCategories()
);

export const createSubCategory = createAsyncThunk(
  'subCategories/createSubCategory',
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

export const updateSubCategory = createAsyncThunk(
  'categories/updateSubCategory',
  async ({
    id,
    updatedSubCategory,
  }: {
    id: SubCategoryId;
    updatedSubCategory: SubCategory;
  }) => {
    await api.updateSubCategory(id, updatedSubCategory);
    return { id, updatedSubCategory };
  }
);

const subCategoriesSlice = createSlice({
  name: 'subCategories',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSubCategories.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadSubCategories.fulfilled, (state, action) => {
        state.subCategories = action.payload.subCategories;
      })

      .addCase(createSubCategory.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.subCategories.push(action.payload);
      })

      .addCase(updateSubCategory.fulfilled, (state, action) => {
        const { id, updatedSubCategory } = action.payload;
        state.subCategories = state.subCategories.map((subCategory) =>
          subCategory.id === id
            ? { ...subCategory, ...updatedSubCategory }
            : subCategory
        );
      });
  },
});

export const { resetError } = subCategoriesSlice.actions;

export default subCategoriesSlice.reducer;
