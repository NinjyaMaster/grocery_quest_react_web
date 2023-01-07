// test fail because of react-secure-storage
import React from 'react';
// import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, within } from '../../../test-utils/testing-library-utils';
import StoresList from '../StoresList';

/* eslint-disable */
// describe('Testing Context Consumer', () => {
// });

test('display stores list', async () => {
  const user = userEvent.setup();
  render(<StoresList />);
  const title = screen.getByText(/Stores List/i);
  expect(title).toBeInTheDocument();

  await waitFor(async () => {
    const store_a = screen.getByText(/LuLuLemon/i);
    expect(store_a).toBeInTheDocument();

    const store_b = screen.getByText(/Rite Aid/i);
    expect(store_b).toBeInTheDocument();
  });

  const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
  expect(deleteButtons.length).toBe(2);

  const LuLuLemon = within(screen.getByTestId('45'));
  await userEvent.click(LuLuLemon.getByRole('button', { name: 'Delete' }));

  const RiteAide = within(screen.getByTestId('45'));
  await userEvent.click(RiteAide.getByRole('button', { name: 'Delete' }));

  // expect(screen.getByText(/No Stores/i)).toBeInTheDocument();
});
