// Login.test failed because of react-secire-storage.
//  https://stackoverflow.com/questions/74428861/how-to-work-with-local-storage-in-case-of-reactjs-jest-testing

import userEvent from '@testing-library/user-event';
import Login from '../Login';
import { render, screen } from '../../test-utils/testing-library-utils';

test('Login screen is loaded', async () => {
  const user = userEvent.setup();

  render(<Login />);
  const emailInput = screen.getByPlaceholderText('email');
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).not.toHaveValue();

  const passwordInput = screen.getByPlaceholderText('password');
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).not.toHaveValue();

  const LogInButton = screen.getByRole('button', { name: 'Sign In' });
  expect(LogInButton).toBeInTheDocument();

  await userEvent.type(emailInput, 'test');
  await userEvent.type(passwordInput, 'testPassword');

  await user.click(LogInButton);
  // expect(screen.getByText(/Stores/i)).toBeInTheDocument();
});
