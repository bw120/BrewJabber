export const UPDATE_POST_LIST = 'UPDATE_POST_LIST'
export const UPDATE_CATEGORY_LIST = 'UPDATE_CATEGORY_LIST'
export const OPEN_NAV_MENU = 'OPEN_NAV_MEN'
export const SORT_LIST_BY = 'SORT_LIST_BY'
export const SEARCH_LIST_BY = 'SEARCH_LIST_BY'

export function updatePostList (postlist) {
  return {
    type: UPDATE_POST_LIST,
    postlist
  }
}

export function updateCategoryList (categories) {
  return {
    type: UPDATE_CATEGORY_LIST,
    categories
  }
}

export function openNavMenu () {
  return {
    type: OPEN_NAV_MENU
  }
}

export function sortListBy (attribute) {
    return {
        type: SORT_LIST_BY,
        attribute
    }
}

export function seachListBy (query) {
    return {
        type: SEARCH_LIST_BY,
        query
    }
}