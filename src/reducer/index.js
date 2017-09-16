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
    UPDATE_POST_VOTE
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
            const { vote, id } = action
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

export default combineReducers({
    navBar: navBar,
    postList: postList,
    postDetails: postDetails,
    routing: routerReducer,
    apiStatus: apiStatus
});