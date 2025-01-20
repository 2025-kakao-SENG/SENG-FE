import {HttpResponse} from 'msw';

function subCategoriesResolver() {
    return HttpResponse.json([
        'sub1',
        'sub2',
        'sub3',
        'sub4',
        'sub5',
        'sub6',
        'sub7',
        'sub8',
        'sub9',
        'sub10',
    ]);
}

export default subCategoriesResolver;
