const BASE_URL = 'https://upskilling-egypt.com:3006/api/v1'

export const BASE_IMG = 'https://upskilling-egypt.com:3006/'

// AUTH URLs
const BASE_AUTHS = `${BASE_URL}/Users`;

export const AUTH_URLS = {
    login: `${BASE_AUTHS}/Login`,
    register: `${BASE_AUTHS}/Register`,
    resetRequest: `${BASE_AUTHS}/Reset/Request`,
    reset: `${BASE_AUTHS}/Reset`,
    verify: `${BASE_AUTHS}/Verify`,
    ChangePassword: `${BASE_AUTHS}/ChangePassword`,
}

// ======================================================================
// CATEGORIES URLs

const BASE_CATEGORIES = `${BASE_URL}/Category`

export const CATEGORIES_URLS = {
    getList: `${BASE_CATEGORIES}`,
    update: (id) => `${BASE_CATEGORIES}/${id}`,
    delete: (id) => `${BASE_CATEGORIES}/${id}`,
    add: `${BASE_CATEGORIES}`
}

// ======================================================================
// RECIPES URLs

const BASE_RECIPES = `${BASE_URL}/Recipe`

export const RECIPES_URLS = {
    getList: `${BASE_RECIPES}`,
    update: (id) => `${BASE_RECIPES}/${id}`,
    delete: (id) => `${BASE_RECIPES}/${id}`,
    add: `${BASE_RECIPES}`
}

// ======================================================================
// USERS URLs

const BASE_USERS = `${BASE_URL}/Users`

export const USERS_URLS = {
    getList: `${BASE_USERS}`,
    deleteUser: (id) => `${BASE_USERS}/${id}`,
    update: `${BASE_USERS}`,
    currentUser: `${BASE_USERS}/currentUser`,
}

// ======================================================================
// TAGs URLs
export const GETALLTAGS = `${BASE_URL}/tag`

// ======================================================================
const BASE_FAVORITE = `${BASE_URL}/userRecipe`

export const FAVORITE_URLS = {
    getList: `${BASE_FAVORITE}`,
    addToFavorite: `${BASE_FAVORITE}`,
    deleteFavorite: (id) => `${BASE_FAVORITE}/${id}`,
}