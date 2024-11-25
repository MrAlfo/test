import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import './styles/index.scss';
import store from './redux/store';
import '@fontsource/poppins';
import { StyledEngineProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);
