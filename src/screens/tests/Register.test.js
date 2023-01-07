import userEvent from '@testing-library/user-event';
import Register from '../Register';
import { render, screen } from '../../test-utils/testing-library-utils';

test('Registration Screen is loaded', async () => {
  // const user = userEvent.setup();
  render(<Register />);
  const usernameInput = screen.getByPlaceholderText('username');
  expect(usernameInput).toBeInTheDocument();
  expect(usernameInput).not.toHaveValue();

  const emailInput = screen.getByPlaceholderText('email');
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByPlaceholderText('password');
  expect(passwordInput).toBeInTheDocument();

  const confirmPasswordInput = screen.getByPlaceholderText('confirm password');
  expect(confirmPasswordInput).toBeInTheDocument();

  await userEvent.type(usernameInput, 'testusername');
  await userEvent.type(emailInput, 'email@email.com');
  await userEvent.type(passwordInput, 'SamplePassword1!');
  await userEvent.type(confirmPasswordInput, 'SamplePassword1!');

  const RegisterButton = screen.getByRole('button', { name: 'Sign Up' });
  expect(RegisterButton).toBeInTheDocument();

  // TODO: fizx this test
  // const successText = screen.getByText('Success!');
  // expect(successText).toBeInTheDocument();
});
