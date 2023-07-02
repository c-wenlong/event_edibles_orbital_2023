import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginPage from '../pages/LoginPage';

describe('Login Page', () => {
  test('should display error message if no account type is selected', async () => {
    const { getByText } = render(<LoginPage />);

    fireEvent.press(getByText('Let\'s Go!'));

    await waitFor(() => {
      expect(getByText('Please indicate Student/Staff')).toBeTruthy();
    });
  });

  test('should display success message on successful login', async () => {
    const { getByTestId, getByText } = render(<LoginPage />);
  
    fireEvent.changeText(getByTestId('email-input'), 'test@u.nus.edu');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.press(getByTestId('student-button'));
    fireEvent.press(getByText('Let\'s Go!'));

    await waitFor(() => {
      expect(getByText('Login successful')).toBeTruthy();
    });
  });
});
