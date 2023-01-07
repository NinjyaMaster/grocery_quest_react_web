import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../../../contexts/AuthProvider';
import { AxiosProvider } from '../../../contexts/AxiosProvider';
import { StoresContext } from '../../../contexts/StoresContextProvider';

import StoreDetail from '../StoreDetail';
import AddGroceries from '../../AddGroceries';

test('store detail', async () => {
  const user = userEvent.setup();
  const storeId = 44;

  const storeProps = {
    stores: [
      {
        id: 44,
        name: 'Rite Aid',
        groceries: [
          {
            id: 34,
            is_completed: false,
            name: 'coq10',
            qty: 1,
            store_id: 44,
          },
          {
            id: 35,
            is_completed: false,
            name: 'teeth paste',
            qty: 1,
            store_id: 44,
          },
        ],
        is_completd: false,
      },
    ],
  };

  const authProps = {
    email: 'email@email.com',
    username: 'username',
    authenticated: true,
  };

  render(
    <AxiosProvider>
      <StoresContext.Provider value={storeProps}>
        <AuthProvider value={authProps}>
          <MemoryRouter initialEntries={[`/store/${storeId}/`]}>
            <Routes>
              <Route path="/store/:storeId/" element={<StoreDetail />} />
              <Route path="/store/add_groceries/:storeId/" element={<AddGroceries />} />
            </Routes>
          </MemoryRouter>
        </AuthProvider>
      </StoresContext.Provider>
    </AxiosProvider>
  );

  // assertion
  expect(screen.getByLabelText(/Rite Aid/i)).toBeInTheDocument();

  const addGroceriesButton = await screen.findByRole('button', { name: 'Add Groceries' });
  expect(addGroceriesButton).toBeInTheDocument();
  await user.click(addGroceriesButton);
  expect(screen.getByText(/Add Groceries/i)).toBeInTheDocument();
});
