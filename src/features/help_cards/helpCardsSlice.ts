import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HelpCardsState from './types/HelpCardsState';
import * as api from './api';
import { HelpCardId } from './types/HelpCard';

const initialState: HelpCardsState = {
  helpCards: [],
  error: undefined,
};

export const createHelpCard = createAsyncThunk(
  'helpCards/createHelpCard',
  async ({
    title,
    categoryId,
    subCategoryId,
    price,
    description,
    fullDescription,
  }: {
    title: string;
    categoryId: number;
    subCategoryId: number;
    price: number;
    description: string;
    fullDescription: string;
  }) => {
    if (categoryId === 0 || subCategoryId === 0) {
      throw new Error('Категория или подкатегория не выбраны');
    }
    if (!description.trim()) {
      throw new Error('Описание не должно быть пустым');
    }
    return api.createHelpCard(
      title,
      categoryId,
      subCategoryId,
      price,
      description,
      fullDescription
    );
  }
);

export const getHelpCards = createAsyncThunk('helpCards/getHelpCards', () =>
  api.getHelpCards()
);

export const deleteHelpCard = createAsyncThunk(
  'helpCards/deleteHelpCard',
  async (id: HelpCardId) => {
    await api.deleteHelpCard(id);
    return id;
  }
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
        state.helpCards.push(action.payload);
      })
      .addCase(getHelpCards.fulfilled, (state, action) => {
        state.helpCards = action.payload.cards;
      })
      .addCase(getHelpCards.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(deleteHelpCard.fulfilled, (state, action) => {
        state.helpCards = state.helpCards.filter(
          (card) => card.id !== action.payload
        );
      })

      .addCase(deleteHelpCard.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { resetError } = helpCardsSlice.actions;

export default helpCardsSlice.reducer;
