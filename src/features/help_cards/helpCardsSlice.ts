// tasks/tasksSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { logout } from '../auth/authSlice';
// import Task, { TaskId } from './types/Task';
import HelpCardsState from './types/HelpCardsState';
import * as api from './api';

const initialState: HelpCardsState = {
  helpCards: [],
  error: undefined,
};

export const createHelpCard = createAsyncThunk(
  'helpCards/createHelpCard',
  async ({ name, description }: { name: string; description: string }) => {
    if (!name.trim() || !description.trim()) {
      throw new Error('Заголовок и описание не должны быть пустыми');
    }
    return api.createHelpCard(name, description);
  }
);
// обращается к api для загрузки тасков пользователя
export const loadHelpCards = createAsyncThunk('helpCards/loadHelpCards', () =>
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
        state.helpCards.push(action.payload);
      })

      .addCase(loadHelpCards.fulfilled, (state, action) => {
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
