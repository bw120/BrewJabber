import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as helpers from '../utils/helpers'
import { retreivePostDetails, retreiveComments, vote } from '../actions/thunks'
import { sortCommentsBy, toggleModalWindow } from '../actions'
import sortBy from 'sort-by'
import Modal from '../components/Modal'

class ShowPostDetails extends Component {

    componentDidMount = () => {
        this.props.getPostDetails(this.props.id);
        this.props.getPostComments(this.props.id);
    };

    render() {
        return (
            <div className="main-container">
            { (this.props.modalWindowOpen) && (<Modal/>) }
                <div className="post">
                    <div className="post-header">
                        <div className="post-back"><button onClick={()=> (this.props.history.goBack())}>Go Back</button></div>
                        <div className="post-title">{ this.props.postDetails.title }</div>
                        <div className="post-attributes">
                            <span className="post-author">&ndash;{this.props.postDetails.author}</span>,&nbsp;
                            <span className="post-date">{helpers.formatDate(this.props.postDetails.timestamp)}</span>
                        </div>
                        <div className="post-controls">
                            <div className="post-rating">
                                <span className="bold-item">Rating:</span> { this.props.postDetails.voteScore }
                                <span className="vote-buttons">
                                    <a className="vote-button" onClick={(e) => { e.preventDefault(); this.props.goVote("upVote", "post", this.props.postDetails.id)}}>
                                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                    </a>
                                    <a className="vote-button" onClick={(e) => { e.preventDefault();this.props.goVote("downVote", "post", this.props.postDetails.id)}}>
                                        <i className="fa fa-thumbs-down" aria-hidden="true"> </i>
                                    </a>
                                </span>
                            </div>
                            <div className="post-delete-edit">
                                <a href="#">Delete</a> | <Link to={`/modifyPost/${this.props.id}`}>Edit</Link>
                            </div>
                        </div>
                    </div>
                    <div className="post-body">
                        { this.props.postDetails.body }
                    </div>
                    <div className="post-comments">
                        <div className="comments-section-header">
                            <div className="comments-section-title">{ this.props.comments.length } Comments</div>
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
                                <a className="comments-section-add" onClick={ (e) => { e.preventDefault(); this.props.openModal(true, "Edit Comment", null, "edit")}}>+ Add Comment</a>
                            </div>
                        </div>

                    {this.props.comments.sort(sortBy(this.props.sortCommentsBy)).map((item) => (
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
                                    <a onClick={ (e) => { e.preventDefault(); this.props.openModal(true, "", item.id, "delete")}}>Delete</a> |
                                    <a onClick={ (e) => { e.preventDefault(); this.props.openModal(true, "Edit Comment", item.id, "edit")}}>Edit</a>
                                </div>
                            </div>
                        </div>
                    ))}

                    </div>
                </div>

            </div>
        )

    };
};

function mapStateToProps(state, routingDetails) {
    return {
        id: routingDetails.match.params.id,
        postDetails: state.postDetails.postDetails,
        comments: state.postDetails.comments,
        sortCommentsBy: state.postDetails.sortBy,
        modalWindowOpen: state.modalWindow.open
    };
}

function mapDispatchToProps (dispatch) {
  return {
    getPostDetails: (data) => dispatch(retreivePostDetails(data)),
    getPostComments: (data) => dispatch(retreiveComments(data)),
    goVote: (action, type, id) => dispatch(vote(action, type, id)),
    changeSortBy: (attribute) => dispatch(sortCommentsBy(attribute)),
    openModal: (open, title, itemId, component) => dispatch(toggleModalWindow(open, title, itemId, component))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPostDetails);