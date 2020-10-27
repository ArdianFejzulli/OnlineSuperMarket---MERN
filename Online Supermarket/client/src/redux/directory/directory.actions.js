import { DirectoryActionTypes } from './directory.types'

export const setSubCategories = subcategories => ({
    type: DirectoryActionTypes.SET_SUB_CATEGORIES,
    payload: subcategories
});