export const UPDATE_POST_LIST = 'UPDATE_POST_LIST'
export const UPDATE_CATEGORY_LIST = 'UPDATE_CATEGORY_LIST'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const OPEN_NAV_MENU = 'OPEN_NAV_MEN'
export const SORT_LIST_BY = 'SORT_LIST_BY'
export const SORT_COMMENTS_BY = 'SORT_COMMENTS_BY'
export const SEARCH_LIST_BY = 'SEARCH_LIST_BY'
export const GET_POST_DETAILS = 'GET_POST_DETAILS'
export const GET_COMMENT_LIST = 'GET_COMMENT_LIST'
export const API_RETURNED_ERROR = 'API_RETURNED_ERROR'
export const API_FETCHING_DATA = 'API_FETCHING_DATA'
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE'
export const UPDATE_COMMENT_VOTE = 'UPDATE_COMMENT_VOTE'
export const TOGGLE_MODAL_WINDOW = 'TOGGLE_MODAL_WINDOW'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

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

export function selectCategory (selectedCategory) {
  return {
    type: UPDATE_CATEGORY,
    selectedCategory
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

export function sortCommentsBy (attribute) {
    return {
        type: SORT_COMMENTS_BY,
        attribute
    }
}

export function seachListBy (query) {
    return {
        type: SEARCH_LIST_BY,
        query
    }
}

export function getPostDetails (postDetails) {
    return {
        type: GET_POST_DETAILS,
        postDetails
    }
}

export function getCommentList (comments) {
    return {
        type: GET_COMMENT_LIST,
        comments
    }
}

export function updateCommentVote (commentVote, commentId) {
    return {
        type: UPDATE_COMMENT_VOTE,
        commentVote, commentId
    }
}

export function updatePostVote (vote, id) {
    return {
        type: UPDATE_POST_VOTE,
        vote, id
    }
}

export function apiIsFetchingData (bool) {
    return {
      type: API_FETCHING_DATA,
      isFetching: bool
    }
}

export function apiReturnedError (bool) {
    return {
      type: API_RETURNED_ERROR,
      errored: bool
    }
}

export function toggleModalWindow (open, title, itemId, component) {
    return {
      type: TOGGLE_MODAL_WINDOW,
      open, title, itemId, component
    }
}

export function deleteComment (DeletedID) {
    return {
      type: DELETE_COMMENT,
      DeletedID
    }
}

export function editComment (editedComment) {
    return {
      type: EDIT_COMMENT,
      editedComment
    }
}

export function addComment (addedComment) {
    return {
      type: ADD_COMMENT,
      addedComment
    }
}

export function editPost (editedPost) {
    return {
      type: EDIT_POST,
      editedPost
    }
}

export function addPost (addedPost) {
    return {
      type: ADD_POST,
      addedPost
    }
}

export function deletePost (deletedPostId) {
    return {
      type: DELETE_POST,
      deletedPostId
    }
}