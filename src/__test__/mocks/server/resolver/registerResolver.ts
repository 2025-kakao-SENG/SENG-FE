import {HttpResponse} from 'msw';

async function registerResolver() {
    return HttpResponse.json(
        {
            status: 'success',
            message: 'User registered successfully.',
        },
        {status: 200},
    );
}

export default registerResolver;
