import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import {
    UPDATE_POST_LIST,
    UPDATE_CATEGORY_LIST,
    UPDATE_CATEGORY,
    OPEN_NAV_MENU,
    SORT_LIST_BY,
    SORT_COMMENTS_BY,
    SEARCH_LIST_BY,
    ADD_TO_POST_LIST,
    SET_CURRENT_POST,
    GET_ALL_COMMENTS,
    API_POST_ERROR,
    API_FETCHING_POST,
    UPDATE_COMMENT_VOTE,
    UPDATE_POST_VOTE,
    TOGGLE_MODAL_WINDOW,
    DELETE_COMMENT,
    EDIT_COMMENT,
    ADD_COMMENT,
    DELETE_POST
} from '../actions';

const nav_initialState = {
    navMenu: false,
    categories: [],
    selectedCategory: ""
};

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
        case UPDATE_CATEGORY:
            const { selectedCategory } = action
            return {
                ...state,
                selectedCategory
            }
        default:
            return state
    }
}

const postList_initialState = {
    postlist: [],
    sortBy: "voteScore",
    searchQuery: "",
    currentPost: ""
};

function postList(state = postList_initialState, action) {
    switch (action.type) {
        case UPDATE_POST_LIST:
            const { postlist } = action;
            return {
                ...state,
                postlist
            }
        case ADD_TO_POST_LIST:
            const { postDetails } = action;
            let list = [];
            let found = false;

            //update if same post
            list = state.postlist.map((item) => {
                if (item.id === postDetails.id) {
                    item = postDetails;
                    found = true;
                }
                return item;
            });

            //add to list if not already in list
            if (!found) {
                list.push(postDetails);
            }

            return {
                ...state,
                postlist: list
            }
        case UPDATE_POST_VOTE:
            const { vote, id } = action;
            return {
                ...state,
                postlist: state.postlist.map((item) => {
                    if (item.id === id) {
                        item.voteScore = item.voteScore + ((vote === "upVote") ? 1 : -1);
                    }
                    return item;
                })
            }
        case DELETE_POST:
            const { deletedPostId } = action;
            return {
                ...state,
                postlist: state.postlist.filter((item) => (item.id !== deletedPostId))
            }
        case SORT_LIST_BY:
            const { attribute } = action;
            return {
                ...state,
                sortBy: attribute
            }
        case SEARCH_LIST_BY:
            const { query } = action;
            return {
                ...state,
                searchQuery: query
            }
        case SET_CURRENT_POST:
            const { postID } = action;
            return {
                ...state,
                currentPost: postID
            }
        default:
            return state
    }
}

const comments_initialState = {
    commentList: [],
    sortBy: "-timestamp"
};

function comments(state = comments_initialState, action) {
    switch (action.type) {
        case GET_ALL_COMMENTS:
            const { allComments } = action;
            const commentList = Object.keys(allComments).map((item, key) => (allComments[item]));
            return {
                ...state,
                commentList
            }
        case SORT_COMMENTS_BY:
            const { attribute } = action;
            return {
                ...state,
                sortBy: attribute
            }
        case UPDATE_COMMENT_VOTE:
            const { commentVote, commentId } = action;
            return {
                ...state,
                commentList: state.commentList.map((item) => {
                    if (item.id === commentId) {
                        item.voteScore = item.voteScore + ((commentVote === "upVote") ? 1 : -1);
                    }
                    return item;
                })
            }
        case EDIT_COMMENT:
            const { editedComment } = action;
            return {
                ...state,
                commentList: state.commentList.map((item) => {
                    if (item.id === editedComment.id) {
                        return editedComment;
                    }
                    return item;
                })
            }
        case ADD_COMMENT:
            const { addedComment } = action;
            return {
                ...state,
                commentList: state.commentList.concat([addedComment])
            }
        case DELETE_COMMENT:
            const { DeletedID } = action;
            return {
                ...state,
                commentList: state.commentList.filter((item) => (item.id !== DeletedID))
            }
        default:
            return state
    }
}

const apiStatus_initialState = {
    post: {
        isFetching: false,
        error: false
    }
};

//TO DO
// 1- update reducer to have status for fetching postDetails, postList, comments, (bascially for each thunk)
// 2- set postlist, showPostDetails, modifyPost to check prop if successfulll

function apiStatus(state = apiStatus_initialState, action) {
    switch (action.type) {
        case API_POST_ERROR:
            const { errored } = action;
            return {
                ...state,
                post: {
                    ...state.post,
                    error: errored
                }
            }
        case API_FETCHING_POST:
            const { isFetching } = action;
            return {
                ...state,
                post: {
                    ...state.post,
                    isFetching
                }
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
};

function modalWindow(state = modalWindow_initialState, action) {
    switch (action.type) {
        case TOGGLE_MODAL_WINDOW:
            const { open, title, itemId, component } = action;
            return {
                ...state,
                open,
                title,
                itemId,
                component
            }
        default:
            return state
    }
}

export default combineReducers({
    navBar,
    postList,
    comments,
    modalWindow,
    routing: routerReducer,
    apiStatus
});