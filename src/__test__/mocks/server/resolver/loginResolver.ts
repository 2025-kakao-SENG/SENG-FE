import {AuthLoginApiResponse} from '@/types/apis/auth/loginApiTypes';
import {HttpResponse} from 'msw';

async function loginResolver({request}: {request: Request}) {
    const {email} = await request.json();

    const response: AuthLoginApiResponse = {
        status: 'success',
        message: 'Login successful.',
        data: {
            pid: 'test-pid',
            name: 'Test User',
            thumbnailImage: null,
            profileImage: null,
            birth: '2000-01-01',
            phone: '010-1234-5678',
            address: 'Seoul, Korea',
            email: 'test@example.com',
            leaf: 100,
        },
    };

    const errorResponse = {
        status: 'error',
        message: 'Invalid email or password.',
    };

    if (email === 'test@example.com') {
        return HttpResponse.json(response, {status: 200});
    }

    return HttpResponse.json(errorResponse, {status: 401});
}

export default loginResolver;
