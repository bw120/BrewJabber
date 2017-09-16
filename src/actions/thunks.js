import { updatePostList, getPostDetails, getCommentList, apiIsFetchingData, apiReturnedError, updatePostVote, updateCommentVote } from '../actions'
import * as API from '../utils/api'

export function getPosts(category) {
    const apiCall = (typeof(category) !== "undefined") ? API.getPostsByCategory : API.getAllPosts;
    return function (dispatch) {
        dispatch(apiIsFetchingData(true));
        return apiCall(category).then((posts) => {
            dispatch(apiIsFetchingData(false));
            dispatch(apiReturnedError(false));
            dispatch(updatePostList(posts));
        }).catch(()=> dispatch(apiReturnedError(true)));
    };
}

export function retreivePostDetails(id) {
    return function (dispatch) {
        dispatch(apiIsFetchingData(true));
        return API.getPostDetails(id).then((detials) => {
            dispatch(apiIsFetchingData(false));
            dispatch(apiReturnedError(false));
            dispatch(getPostDetails(detials));
        }).catch(()=> dispatch(apiReturnedError(true)));
    };
}

export function retreiveComments(id) {
    return function (dispatch) {
        dispatch(apiIsFetchingData(true));
        return API.getCommentsForPost(id).then((comments) => {
            dispatch(apiIsFetchingData(false));
            dispatch(apiReturnedError(false));
            dispatch(getCommentList(comments));
        }).catch(()=> dispatch(apiReturnedError(true)));
    };
}

export function vote(vote, type, id) {
    let apiCall, action;
    if (type === "comment") {
        apiCall = API.commentVote;
        action = updateCommentVote;
    } else {
        apiCall = API.postVote;
        action = updatePostVote;
    }

    return function (dispatch) {
        dispatch(apiIsFetchingData(true));
        return apiCall(id, vote).then((res) => {
            dispatch(apiIsFetchingData(false));
            dispatch(apiReturnedError(false));
            dispatch(action(vote, id));
        }).catch(()=> dispatch(apiReturnedError(true)));
    };
}



