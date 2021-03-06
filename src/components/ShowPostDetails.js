import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as helpers from '../utils/helpers'
import { retreivePostDetails, retreiveAllComments, vote } from '../actions/thunks'
import { sortCommentsBy, toggleModalWindow, setCurrentPost } from '../actions'
import { push } from 'react-router-redux';
import sortBy from 'sort-by'
import Modal from '../components/Modal'

class ShowPostDetails extends Component {

    componentDidMount = () => {
        const thisPost = this.thisPost();
        //if post details are not in redux store send reqeust to get from the API
        if (typeof(thisPost) === "undefined") {
            this.props.getPostDetails(this.props.id);
        }
        //sets current post to redux store to be used in adding comments
        this.props.setPostID(this.props.id);
        this.props.getPostComments(this.props.id);
    };

    //gets the data for this post from the list of posts.
    thisPost = () => {
        return this.props.postList.filter((item) => (item.id === this.props.id))[0];
    }

    render() {
        // the following code runs a check to see status of post details so that some feedback can be given to the user
        // If the API is working on fetching data it will give the user a loading message.
        // if the API faled it will give them an error that it wasn't found.
        let filteredComments = [];
        const post = this.thisPost();
        let canDisplayPost = false;
        let errorMsg = "Sorry, your post was not found.";

        //currently pull data from API
        if (this.props.apiStatus.isFetching) {
            canDisplayPost = false;
            errorMsg = "Loading Post Details...";
        }

        //Could not get data from API
        if (this.props.apiStatus.error) {
            canDisplayPost = false;
            errorMsg = "Sorry, your post was not found.";
        }

        //Was able to get data from state or API
        if (typeof(post) !== "undefined" && this.props.category === post.category) {
            canDisplayPost = true;
            errorMsg = "";

            //filter and sort comments
            filteredComments = this.props.comments.filter((item) => (item.parentId === post.id)).sort(sortBy(this.props.sortCommentsBy));
        }

        return (
            <div className="main-container">
            {
                //modal window component used for editing/deleting comments
                (this.props.modalWindowOpen) && (<Modal/>) }
                <div className="post">


                { (canDisplayPost === false ) ? (
                    <div className="post-header">
                        <div className="post-error">{errorMsg}</div>
                    </div>
                    ) : (
                    <div>
                    <div className="post-header">
                        <div className="post-back"><button onClick={()=> (this.props.history.goBack())}>Go Back</button></div>
                        <div className="post-title">{ post.title }</div>
                        <div className="post-attributes">
                            <span className="post-author">&ndash;{post.author}</span>,&nbsp;
                            <span className="post-date">{helpers.formatDate(post.timestamp)}</span>
                        </div>
                        <div className="post-controls">
                            <div className="post-rating">
                                <span className="bold-item">Rating:</span> { post.voteScore }
                                <span className="vote-buttons">
                                    <a className="vote-button" onClick={(e) => { e.preventDefault(); this.props.goVote("upVote", "post", post.id)}}>
                                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                    </a>
                                    <a className="vote-button" onClick={(e) => { e.preventDefault();this.props.goVote("downVote", "post", post.id)}}>
                                        <i className="fa fa-thumbs-down" aria-hidden="true"> </i>
                                    </a>
                                </span>
                            </div>
                            <div className="post-delete-edit">
                                <a onClick={ (e) => { e.preventDefault(); this.props.openModal(true, "", post.id, "deletePost")}}>Delete</a> | <Link to={`/editPost/${this.props.id}`}>Edit</Link>
                            </div>
                        </div>
                    </div>
                    <div className="post-body">
                        { post.body }
                    </div>
                    <div className="post-comments">
                        <div className="comments-section-header">
                            <div className="comments-section-title">{ filteredComments.length } Comments</div>
                            <div className="comments-section-control">
                                <div className="comments-section-sorter">
                                    <div className="sorter">Sort by:&nbsp;
                                        <select value={ this.props.sortCommentsBy } onChange={(event)=> (this.props.changeSortBy(event.target.value))} className="sorter-select">
                                            <option value="-timestamp">Newest</option>
                                            <option value="timestamp">Oldest</option>
                                            <option value="-voteScore">Best rating</option>
                                            <option value="voteScore">Worst rating</option>
                                        </select>
                                    </div>
                                </div>
                                <a className="comments-section-add" onClick={ (e) => { e.preventDefault(); this.props.openModal(true, "Edit Comment", null, "editComment")}}>+ Add Comment</a>
                            </div>
                        </div>

                    {filteredComments.map((item) => (
                        <div key={item.id} className="comment-item">
                            <div className="comment-body">
                                {item.body}
                            </div>
                            <div className="comment-attributes">
                                <span className="post-author">&ndash;{item.author}</span>,
                                <span className="post-date"> {helpers.formatDate(item.timestamp)}</span>
                            </div>
                            <div className="comment-controls">
                                <div className="post-rating">
                                    <span className="bold-item">Rating:</span> { item.voteScore }
                                        <span className="vote-buttons">
                                            <a className="vote-button" onClick={(e) => { e.preventDefault(); this.props.goVote("upVote", "comment", item.id)}}>
                                                <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                            </a>
                                            <a className="vote-button" onClick={(e) => { e.preventDefault(); this.props.goVote("downVote", "comment", item.id)}}>
                                                <i className="fa fa-thumbs-down" aria-hidden="true"> </i>
                                            </a>
                                        </span>
                                </div>
                                <div className="comment-delete-edit">
                                    <a onClick={ (e) => { e.preventDefault(); this.props.openModal(true, "", item.id, "deleteComment")}}>Delete</a> | &nbsp;
                                    <a onClick={ (e) => { e.preventDefault(); this.props.openModal(true, "Edit Comment", item.id, "editComment")}}>Edit</a>
                                </div>
                            </div>
                        </div>
                    ))}

                    </div>
                    </div>
                )}
                </div>

            </div>
        )
    };
};

function mapStateToProps(state, routingDetails) {
    return {
        id: routingDetails.match.params.id,
        postList: state.postList.postlist,
        comments: state.comments.commentList,
        sortCommentsBy: state.comments.sortBy,
        modalWindowOpen: state.modalWindow.open,
        category: routingDetails.match.params.category,
        apiStatus: state.apiStatus.post
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPostDetails: (data) => dispatch(retreivePostDetails(data)),
        getPostComments: (data) => dispatch(retreiveAllComments(data)),
        goVote: (action, type, id) => dispatch(vote(action, type, id)),
        changeSortBy: (attribute) => dispatch(sortCommentsBy(attribute)),
        openModal: (open, title, itemId, component) => dispatch(toggleModalWindow(open, title, itemId, component)),
        goToURL: (url) => dispatch(push(url)),
        setPostID: (id) => dispatch(setCurrentPost(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowPostDetails);