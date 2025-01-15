import '@testing-library/jest-dom';
import {cleanup} from '@testing-library/react';
import {afterAll, afterEach, beforeAll} from 'vitest';
import server from '@/__test__/mocks/server/server';

server.listen();

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
    cleanup();
});
afterAll(() => server.close());
