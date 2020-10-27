import { resolve } from './resolver.js';

const BASE_URL = 'http://localhost:5000/api';

const userEndpoint = `${BASE_URL}/users`;
const productEndpoint = `${BASE_URL}/product/`;
const categoryEndpoint = `${BASE_URL}/categories`;
const subCategoryEndpoint = `${BASE_URL}/subCategories`;
const orderEndpoint = `${BASE_URL}/orders`;

const HEADERS = { 'Content-type': 'application/json' };

export const login = async (email, password) => {
    const loginEndpoint = `${userEndpoint}/login`;

    const res = await fetch(loginEndpoint, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ email, password })
    });

    return await resolve(await res.json());
}

export const signUp = async (params) => {
    const signUpEndpoint = `${userEndpoint}/register`;

    const res = await fetch(signUpEndpoint, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(params)
    });

    return await resolve(await res.json());
}

export const getSubCategories = async () => {
    const getSubCategoriesEndpoint = `${subCategoryEndpoint}/getSubCategories`;

    const res = await fetch(getSubCategoriesEndpoint, {
        method: 'GET',
        headers: HEADERS
    });

    return await resolve(await res.json());
}

export const getCategories = async () => {
    const getCategoriesEndpoint = `${categoryEndpoint}/getCategories`;

    const res = await fetch(getCategoriesEndpoint, {
        method: 'GET',
        headers: HEADERS
    });

    return await resolve(await res.json());
}

export const getProducts = async () => {
    const getProductsEndpoint = `${productEndpoint}/getProducts`;

    const res = await fetch(getProductsEndpoint, {
        method: 'GET',
        headers: HEADERS
    });

    return await resolve(await res.json());
}