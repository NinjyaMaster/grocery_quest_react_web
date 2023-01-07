import userEvent from '@testing-library/user-event';
import AddStore from '../AddStore';
import { render, screen } from '../../test-utils/testing-library-utils';

test('Add Store', async () => {
  // user = userEvent.setup();

  render(<AddStore />);
  const title = screen.getByText(/Add Store/i);
  expect(title).toBeInTheDocument();
});
