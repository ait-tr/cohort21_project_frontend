import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HelpCardsState from './types/HelpCardsState';
import * as api from './api';
import HelpCard, { HelpCardId } from './types/HelpCard';

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
      throw new Error('Category or Subcategory not selected');
    }
    if (!description.trim()) {
      throw new Error('Description cannot be empty');
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

export const updateHelpCard = createAsyncThunk(
  'helpCards/updateHelpCard',
  async (card: HelpCard) => {
    if (card.category.id === 0 || card.subCategory.id === 0) {
      throw new Error('Category or Subcategory not selected');
    }
    if (card.category.id !== card.subCategory.categoryId) {
      throw new Error('SubCategory does not match to this Category');
    }
    if (!card.description.trim()) {
      throw new Error('Description cannot be empty');
    }
    return api.updateHelpCard(card.id, card);
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

      .addCase(updateHelpCard.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateHelpCard.fulfilled, (state, action) => {
        const updatedCard = action.payload;
        const updatedHelpCards = state.helpCards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        );
        state.helpCards = updatedHelpCards;
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
