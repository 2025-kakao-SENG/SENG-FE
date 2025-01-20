import {HttpResponse} from 'msw';

function categoriesResolver() {
    return HttpResponse.json([
        {
            category_id: 1,
            category_name: '소설',
            subcategories: [
                {
                    subcategory_id: 1,
                    subcategory_name: '한국소설',
                },
                {
                    subcategory_id: 2,
                    subcategory_name: '영미소설',
                },
                {
                    subcategory_id: 3,
                    subcategory_name: '일본소설',
                },
            ],
        },
        {
            category_id: 2,
            category_name: '시',
            subcategories: [
                {
                    subcategory_id: 4,
                    subcategory_name: '한국시',
                },
                {
                    subcategory_id: 5,
                    subcategory_name: '영미시',
                },
                {
                    subcategory_id: 6,
                    subcategory_name: '일본시',
                },
            ],
        },
        {
            category_id: 3,
            category_name: '에세이',
            subcategories: [
                {
                    subcategory_id: 7,
                    subcategory_name: '한국에세이',
                },
                {
                    subcategory_id: 8,
                    subcategory_name: '영미에세이',
                },
                {
                    subcategory_id: 9,
                    subcategory_name: '일본에세이',
                },
            ],
        },
    ]);
}

export default categoriesResolver;
