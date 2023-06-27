import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HelpCardsState from './types/HelpCardsState';
import * as api from './api';

const initialState: HelpCardsState = {
  helpCards: [],
  error: undefined,
};

export const createHelpCard = createAsyncThunk(
  'helpCards/createHelpCard',
  async ({
    categoryId,
    subCategoryId,
    price,
    description,
  }: {
    categoryId: number;
    subCategoryId: number;
    price: number;
    description: string;
  }) => {
    if (categoryId === 0 || subCategoryId === 0) {
      throw new Error('Категория или подкатегория не выбраны');
    }
    if (!description.trim()) {
      throw new Error('Описание не должно быть пустым');
    }
    return api.createHelpCard(categoryId, subCategoryId, price, description);
  }
);
export const getHelpCards = createAsyncThunk('helpCards/getHelpCards', () =>
  api.getHelpCards()
);

const helpCardsSlice = createSlice({
  name: 'helpCards',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHelpCard.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createHelpCard.fulfilled, (state, action) => {
        console.log(action.payload);
        state.helpCards.push(action.payload);
      })

      .addCase(getHelpCards.fulfilled, (state, action) => {
        state.helpCards = action.payload.helpCards;
      });

    // .addCase(updateTask.fulfilled, (state, action) => {
    //   state.tasks = state.tasks.map((task) =>
    //     task.id === action.payload.id ? action.payload : task
    //   );
    // })
  },
});

export const { resetError } = helpCardsSlice.actions;

export default helpCardsSlice.reducer;
