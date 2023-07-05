import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import App from './App/App';
import './index.css';
import store from './store';
import theme from './theme/theme';

const container = document.getElementById('root');
const root = container && createRoot(container);

root!.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
