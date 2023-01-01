import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthProvider';
import StoresContextProvider from './contexts/StoresContextProvider';

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
