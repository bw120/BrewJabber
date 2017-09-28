import { updatePostList, getPostDetails, getCommentList, apiIsFetchingData,
    apiReturnedError, updatePostVote, updateCommentVote, deleteComment, toggleModalWindow,
    addComment, editComment, addPost, editPost, deletePost} from '../actions'
import * as API from '../utils/api'

export function getPosts(category) {
    const apiCall = (category.length > 0) ? API.getPostsByCategory : API.getAllPosts;
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

export function removeComment(id) {
    return function (dispatch) {
        dispatch(apiIsFetchingData(true));
        return API.deleteComment(id).then((res) => {
            dispatch(apiIsFetchingData(false));
            dispatch(apiReturnedError(false));
            dispatch(deleteComment(id));
            dispatch(toggleModalWindow(false));
        }).catch(()=> dispatch(apiReturnedError(true)));
    };
}

export function editOrAddComment(comment, id) {
    const apiCall = (id)? API.editComment : API.addComment;
    const action = (id)? editComment : addComment;
    return function (dispatch) {
        dispatch(apiIsFetchingData(true));
        return apiCall(comment, id).then((res) => {
            dispatch(toggleModalWindow(false));
            console.log(res);
            dispatch(apiIsFetchingData(false));
            dispatch(apiReturnedError(false));
            dispatch(action(comment, id));
        }).catch(()=> dispatch(apiReturnedError(true)));
    };
}

export function editOrAddPost(post, id) {
    const apiCall = (id)? API.editPost : API.createPost;
    const action = (id)? editPost : addPost;
console.log(id)
    return function (dispatch) {
        dispatch(apiIsFetchingData(true));
        return apiCall(post, id).then((res) => {
            dispatch(toggleModalWindow(false));
            console.log(res);
            dispatch(apiIsFetchingData(false));
            dispatch(apiReturnedError(false));
            dispatch(action(post, id));
        }).catch(()=> dispatch(apiReturnedError(true)));
    };
}

export function removePost(id) {
    return function (dispatch) {
        dispatch(apiIsFetchingData(true));
        return API.deletePost(id).then((res) => {
            dispatch(apiIsFetchingData(false));
            dispatch(apiReturnedError(false));
            dispatch(deletePost(id));
        }).catch(()=> dispatch(apiReturnedError(true)));
    };
}