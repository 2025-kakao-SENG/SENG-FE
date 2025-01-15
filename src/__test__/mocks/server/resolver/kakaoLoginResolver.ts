import {HttpResponse} from 'msw';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const kakaoLoginResolver = async (request: any) => {
    const {properties} = await request.json();

    return HttpResponse.json(
        {
            status: 'success',
            message: 'Login successful.',
            data: {
                name: properties.nickname,
                thumbnail_image: properties.thumbnail_image,
                profile_image: properties.profile_image,
                birth: null,
                phone: null,
                address: null,
                email: null,
                leaf: 0,
            },
        },
        {status: 200},
    );
};

export default kakaoLoginResolver;
