// handlers.js
import {http} from 'msw';
import loginResolver from './resolver/loginResolver';
import registerResolver from './resolver/registerResolver';
import kakaoLoginResolver from './resolver/kakaoLoginResolver';
import deregisterResolver from './resolver/deregisterResolver';
import categoriesResolver from './resolver/categoriesResolver';
import subCategoriesResolver from './resolver/subCategoriesResolver';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const handlers = [
    http.post(`${SERVER_URL}/register.php`, registerResolver),
    http.post(`${SERVER_URL}/login.php`, loginResolver),
    http.post(`${SERVER_URL}/kakao_login.php`, kakaoLoginResolver),
    http.delete(`${SERVER_URL}/delete_user.php`, deregisterResolver),
    http.get(`${SERVER_URL}/categories.php`, categoriesResolver),
    http.get(`${SERVER_URL}/gpt_categories.php`, subCategoriesResolver),
];

export default handlers;
