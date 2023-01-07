import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthProvider';
import { AxiosProvider } from '../contexts/AxiosProvider';
import StoresContextProvider from '../contexts/StoresContextProvider';

function AllTheProviders({ children }) {
  return (
    <BrowserRouter>
      <AxiosProvider>
        <AuthProvider>
          <StoresContextProvider>{children}</StoresContextProvider>
        </AuthProvider>
      </AxiosProvider>
    </BrowserRouter>
  );
}

const RenderWithContext = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { RenderWithContext as render };
