import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as API from '../utils/api'
import * as helpers from '../utils/helpers'

class ShowPostDetails extends Component {

    componentDidMount = () => {

        API.getAllPosts().then((posts) => {
            this.setState({ posts: posts })
        })
    };

    render() {
        return (
            <div className="main-container">
                <div className="post">
                    <div className="post-header">
                        <div className="post-back"><a href="#">Back button</a></div>
                        <div className="post-title">This is the post title</div>
                        <div className="post-attributes">
                            <span className="post-author">&ndash;Author</span>,
                            <span className="post-date">8/25/17 4:35pm</span>
                        </div>
                        <div className="post-controls">
                            <div className="post-rating">
                                <span className="bold-item">Rating:</span> 5 <a href="#">vote up</a> <a href="#">vote down</a>
                            </div>
                            <div className="post-delete-edit">
                                <a href="#">Delete Post</a> | <a href="#">Edit post</a>
                            </div>
                        </div>
                    </div>
                    <div className="post-body">
                        Post text ges here. This can be a long paragraph talking about whatever. it can go on and on on for a very long time. There really isn't any limit here.


                    </div>
                    <div className="post-comments">
                        <div className="comments-section-header">
                            <div className="comments-section-title">Comments</div>
                            <div className="comments-section-control">
                                <div className="comments-section-sorter">
                                    Sort by: <select>
                                                <option>Date</option>
                                                <option>Rating</option>
                                            </select>

                                </div>
                                <a className="comments-section-add" href="#">Add Comment</a>
                            </div>
                        </div>

                        <div className="comment-item">
                            <div className="comment-body">
                                Comment text goes here. This can be several lines long. It doesn't really have a limit. Comment text goes here. This can be several lines long. It doesn't really have a limit. Comment text goes here. This can be several lines long. It doesn't really have a limit. Comment text goes here. This can be several lines long. It doesn't really have a limit.
                            </div>
                            <div className="comment-attributes">
                                <span className="post-author">&ndash;Author</span>,
                                <span className="post-date">8/25/17 4:35pm</span>
                            </div>
                            <div className="comment-controls">
                                <div className="post-rating">
                                    <span className="bold-item">Rating:</span> 5 <a href="#">vote up</a> <a href="#">vote down</a>
                                </div>
                                <div className="comment-delete-edit">
                                    <a href="#">Delete Comment</a> | <a href="#">Edit Comment</a>
                                </div>
                            </div>
                        </div>

                       <div className="comment-item">
                            <div className="comment-body">
                                Comment text goes here. This can be several lines long. It doesn't really have a limit. Comment text goes here. This can be several lines long. It doesn't really have a limit. Comment text goes here. This can be several lines long. It doesn't really have a limit. Comment text goes here. This can be several lines long. It doesn't really have a limit.
                            </div>
                            <div className="comment-attributes">
                                <span className="post-author">&ndash;Author</span>,
                                <span className="post-date">8/25/17 4:35pm</span>
                            </div>
                            <div className="comment-controls">
                                <div className="post-rating">
                                    <span className="bold-item">Rating:</span> 5 <a href="#">vote up</a> <a href="#">vote down</a>
                                </div>
                                <div className="comment-delete-edit">
                                    <a href="#">Delete Comment</a> | <a href="#">Edit Comment</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )

    };
};

function mapStateToProps(routing, routingDetails) {
    const id = routingDetails.match.params.id;
    return {
        id: id
    };
}

export default connect(
  mapStateToProps
)(ShowPostDetails);