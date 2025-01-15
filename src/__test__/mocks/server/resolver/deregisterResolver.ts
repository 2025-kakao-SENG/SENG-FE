import {HttpResponse} from 'msw';

async function deregisterResolver() {
    return HttpResponse.json(
        {
            status: 'success',
            message: 'User deleted successfully.',
        },
        {status: 200},
    );
}

export default deregisterResolver;
