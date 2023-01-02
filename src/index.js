import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthProvider';
import StoresContextProvider from './contexts/StoresContextProvider';
import { AxiosProvider } from './contexts/AxiosProvider';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AxiosProvider>
        <AuthProvider>
          <StoresContextProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </StoresContextProvider>
        </AuthProvider>
      </AxiosProvider>
    </BrowserRouter>
  </React.StrictMode>
);
