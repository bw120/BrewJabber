import { updatePostList } from '../actions'
import * as API from '../utils/api'

export function getPosts(category) {
    const action = (typeof(category) !== "undefined") ? API.getPostsByCategory : API.getAllPosts;
    return function (dispatch) {
        return action(category).then((posts) => {
            dispatch(updatePostList(posts));
        });
    };
}

