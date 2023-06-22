import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App/App';
import './index.css';
import Header from './features/main/Header';

const container = document.getElementById('root');
const root = container && createRoot(container);

root!.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Header />
    <App />
  </Provider>
  // </React.StrictMode>
);
