import {setupServer} from 'msw/node';
import {handlers} from '@/__test__/mocks/server/handler';

const server = setupServer(...handlers);

export default server;
