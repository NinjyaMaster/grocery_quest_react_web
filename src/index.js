import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider';
import StoresContextProvider from './context/stores_context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StoresContextProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        </StoresContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);