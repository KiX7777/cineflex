import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { MoviesProvider } from './Store/MoviesContext.tsx';
import { setBearer } from './util/helpers.ts';
setBearer();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MoviesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoviesProvider>
  </React.StrictMode>
);
