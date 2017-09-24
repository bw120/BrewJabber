import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import {
    UPDATE_POST_LIST,
    UPDATE_CATEGORY_LIST,
    OPEN_NAV_MENU,
    SORT_LIST_BY,
    SORT_COMMENTS_BY,
    SEARCH_LIST_BY,
    GET_POST_DETAILS,
    GET_COMMENT_LIST,
    API_RETURNED_ERROR,
    API_FETCHING_DATA,
    UPDATE_COMMENT_VOTE,
    UPDATE_POST_VOTE,
    TOGGLE_MODAL_WINDOW,
    DELETE_COMMENT,
    EDIT_COMMENT,
    ADD_COMMENT
} from '../actions'

const nav_initialState = {
    navMenu: false,
    categories: []
}

function navBar(state = nav_initialState, action) {
    switch (action.type) {
        case UPDATE_CATEGORY_LIST:
            const { categories } = action

            return {
                ...state,
                categories
            }
        case OPEN_NAV_MENU:
            return {
                ...state,
                navMenu: !state.navMenu
            }
        default:
            return state
    }
}

const postList_initialState = {
    postlist: [],
    sortBy: "voteScore",
    searchQuery: ""
}

function postList(state = postList_initialState, action) {
    switch (action.type) {
        case UPDATE_POST_LIST:
            const { postlist } = action

            return {
                ...state,
                postlist
            }
        case SORT_LIST_BY:
            const { attribute } = action
            return {
                ...state,
                sortBy: attribute
            }
        case SEARCH_LIST_BY:
            const { query } = action
            return {
                ...state,
                searchQuery: query
            }
        default:
            return state
    }
}

const postDetails_initialState = {
    postDetails: {},
    comments: [],
    sortBy: "-timestamp"
}

function postDetails(state = postDetails_initialState, action) {
    switch (action.type) {
        case GET_POST_DETAILS:
            const { postDetails } = action
            return {
                ...state,
                postDetails
            }
        case GET_COMMENT_LIST:
            const { comments } = action
            return {
                ...state,
                comments
            }
        case UPDATE_POST_VOTE:
            const { vote } = action
            const voteScore = state.postDetails.voteScore + ((vote === "upVote") ? 1 : -1);
            return {
                ...state,
                postDetails : {
                    ...state.postDetails,
                    voteScore
                }
            }
        case UPDATE_COMMENT_VOTE:
            const { commentVote, commentId } = action
            return {
                ...state,
                comments : state.comments.map((item) => {
                    if (item.id === commentId) {
                        item.voteScore = item.voteScore + ((commentVote === "upVote") ? 1 : -1);
                    }
                    return item;
                })
            }
        case DELETE_COMMENT:
            const { DeletedID } = action
            return {
                ...state,
                comments : state.comments.filter((item) => ( item.id !== DeletedID))
            }
        case EDIT_COMMENT:
            const { editedComment } = action
            return {
                ...state,
                comments : state.comments.map((item) => {
                    if (item.id === editedComment.id) {
                        return editedComment;
                    }
                    return item;
                })
            }
        case ADD_COMMENT:
            const { addedComment } = action
            return {
                ...state,
                comments : state.comments.concat([addedComment])
            }
        case SORT_COMMENTS_BY:
            const { attribute } = action
            return {
                ...state,
                sortBy: attribute
            }
        default:
            return state
    }
}



const apiStatus_initialState = {
    isFetching: false,
    errored: false
}

function apiStatus(state = apiStatus_initialState, action) {
    switch (action.type) {
        case API_RETURNED_ERROR:
            const { errored } = action
            return {
                ...state,
                errored
            }
        case API_FETCHING_DATA:
            const { isFetching } = action
            return {
                ...state,
                isFetching
            }
        default:
            return state
    }
}

const modalWindow_initialState = {
    open: false,
    title: "Modal Title",
    component: "",
    itemId: ""
}

function modalWindow(state = modalWindow_initialState, action) {
    switch (action.type) {
        case TOGGLE_MODAL_WINDOW:
            const { open, title, itemId, component } = action
            return {
                ...state,
                open, title, itemId, component
            }
        default:
            return state
    }
}


export default combineReducers({
    navBar: navBar,
    postList: postList,
    postDetails: postDetails,
    modalWindow: modalWindow,
    routing: routerReducer,
    apiStatus: apiStatus
});