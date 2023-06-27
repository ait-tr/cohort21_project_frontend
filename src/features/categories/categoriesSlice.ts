// categories/categoriesSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { logout } from '../auth/authSlice';
// import Task, { TaskId } from './types/Task';
import CategoriesState from './types/CategoriesState';
import * as api from './api';
import Categories, { CategoriesId } from './types/Categories';

const initialState: CategoriesState = {
  categories: [],
  error: undefined,
};

export const createCategories = createAsyncThunk(
  'categories/createCategories',
  async ({ title, description }: { title: string, description: string }) => {
    if (!title.trim() || !description.trim()) {
      throw new Error('Заголовок задачи и описание не должны быть пустыми');
    }
    return api.createCategories(title, description);
  }
);
// обращается к api для загрузки тасков пользователя
export const loadCategories = createAsyncThunk('categories/loadCategories', () =>
  api.getCategories()
);
// обращается к api для загрузки тасков всех пользователей
export const loadCategoriesOfAll = createAsyncThunk('categories/loadCategoriesOfAll', () =>
  api.getCategoriesOfAll()
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, updatedCategory }: { id: CategoriesId; updatedCategory: Categories }) => {
    await api.updateCategory(id, updatedCategory);
    return { id, updatedCategory };
  }
);

export const deleteCategories = createAsyncThunk(
  'categories/deleteCategories',
  async (id: CategoriesId) => {
    await api.deleteCategories(id);
    return id;
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
      .addCase(createCategories.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createCategories.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
    /*  .addCase(loadCategoriesOfAll.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      */

      .addCase(updateCategory.fulfilled, (state, action) => {
        const { id, updatedCategory } = action.payload;
        state.categories = state.categories.map((category) =>
          category.id === id ? { ...category, ...updatedCategory } : category
        );
      })

    .addCase(deleteCategories.fulfilled, (state, action) => {
      state.categories = state.categories.filter((categories) => categories.id !== action.payload);
    });

    // .addCase(logout.fulfilled, (state) => {
    //   state.tasks = [];
    // });
  },
});

export const { resetError } = categoriesSlice.actions;

export default categoriesSlice.reducer;