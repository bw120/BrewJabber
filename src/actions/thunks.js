import { updatePostList, addPostDetails, getAllCommentList, apiIsFetchingPost,
    apiPostError, updatePostVote, updateCommentVote, deleteComment, toggleModalWindow,
    addComment, editComment, deletePost} from '../actions'
import * as API from '../utils/api'

export function getPosts(category) {
    const apiCall = (category.length > 0) ? API.getPostsByCategory : API.getAllPosts;
    return function (dispatch) {
        return apiCall(category).then((posts) => {
            dispatch(updatePostList(posts));
        })
        //.catch(()=> dispatch(apiReturnedError(true)));
    };
}

export function retreivePostDetails(id) {
    return function (dispatch) {
        dispatch(apiIsFetchingPost(true));
        dispatch(apiPostError(false));

        return API.getPostDetails(id).then((details) => {
            if (typeof(details.error) !== "undefined") {
                dispatch(apiPostError(true));
                return;
            }
            dispatch(addPostDetails(details));
            dispatch(apiIsFetchingPost(false));
            dispatch(apiPostError(false));
        }).catch(()=> dispatch(apiPostError(true)));
    };
}

//get comments for all posts
export function retreiveAllComments() {
    return function (dispatch) {
        return API.getAllComments().then((comments) => {
            dispatch(getAllCommentList(comments));
        })
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
        return apiCall(id, vote).then((res) => {
            dispatch(action(vote, id));
        })
    };
}

export function removeComment(id) {
    return function (dispatch) {
        return API.deleteComment(id).then((res) => {
            dispatch(deleteComment(id));
            dispatch(toggleModalWindow(false));
        })
    };
}

export function editOrAddComment(comment, id) {
    console.log("I Thunk");
    const apiCall = (id)? API.editComment : API.addComment;
    const action = (id)? editComment : addComment;
    return function (dispatch) {
        return apiCall(comment, id).then((res) => {
            dispatch(toggleModalWindow(false));
            dispatch(action(comment, id));
        })
    };
}

export function editOrAddPost(post, id) {
    const apiCall = (id)? API.editPost : API.createPost;
    return function (dispatch) {
        dispatch(addPostDetails(post));
        return apiCall(post, id).then((res) => {
        })
    };
}

export function removePost(id) {
    return function (dispatch) {
        return API.deletePost(id).then((res) => {
            dispatch(deletePost(id));
        })
    };
}