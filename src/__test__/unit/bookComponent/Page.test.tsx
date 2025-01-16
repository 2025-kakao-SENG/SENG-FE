import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import bookMockData from '../bookMockData';
import Page from '@/components/book/Page';

describe('Page Component', () => {
    it('renders the canvas element', () => {
        render(<Page />);
        const canvas = screen.getByTestId('canvas');
        expect(canvas).toBeInTheDocument();
    });

    it('renders default text on the canvas', () => {
        render(<Page />);
        const canvas = screen.getByTestId('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        // Assertion: Initial text rendering
        expect(ctx?.fillText).toHaveBeenCalledWith('Default Text', 50, 50);
    });

    it('renders user-input text on the canvas', () => {
        render(<Page />);
        const input = screen.getByPlaceholderText('Enter text here');
        const canvas = screen.getByTestId('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        // Simulate user input
        fireEvent.change(input, {target: {value: 'Hello, Canvas!'}});
        fireEvent.blur(input); // Trigger canvas update on blur

        // Assertion: Text from user input is rendered
        expect(ctx?.clearRect).toHaveBeenCalled(); // Ensure canvas is cleared
        expect(ctx?.fillText).toHaveBeenCalledWith('Hello, Canvas!', 50, 50);
    });
});
