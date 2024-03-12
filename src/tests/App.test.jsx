import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Test 1: Write a test that checks to see if our `App` component renders without throwing an error.
it('App Component Renders Without Error', () => {
    render(<App />);
});

