import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as helpers from '../utils/helpers'
import { sortListBy, seachListBy, selectCategory } from '../actions'
import { getPosts, retreiveAllComments, vote, removePost } from '../actions/thunks'
import Link from 'react-router-redux-dom-link';
import { push } from 'react-router-redux';
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'


class ListPosts extends Component {

    componentDidMount = () => {
        this.updatePageCategory(this.props.category);
        this.props.getAllComments();
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.category !== this.props.category) {
          this.updatePageCategory(nextProps.category);
        }
    }

    updatePageCategory = (category) => {
        //use empty string if category is undefined (when navigating to root)
        const cat = (typeof(category) !== "undefined") ? category : "";
        //If navigating to category view from url rather than UI, update category
        this.props.changeCategory(cat);

        //get posts for the selected category
        this.props.updateList(cat);
    }

    sortCommentsByPost = (comments) => {
        let sortedComments = {};
        comments.forEach((item) => {
            sortedComments[item.parentId] = sortedComments[item.parentId] || [];
            sortedComments[item.parentId].push(item);
        });
        return sortedComments;
    }

    deletePost = (id) => {
        this.props.deletePost(id);
        this.props.goToURL("/");
    }

    render() {

        //Get sorted comments so you can easily access them by post ID.
        let comments = this.sortCommentsByPost(this.props.comments);

        //filter post list to show only those based on search input
        let postList;
        if (this.props.searchquery.length > 0) {
            let match = new RegExp(escapeRegExp(this.props.searchquery), 'i');
            postList = this.props.postlist.filter((post) => match.test(post.title));
        } else {
            postList = this.props.postlist;
        }

        return (

            <div className="main-container">
                <div className="list-header">
                    <h1 className="category-header">{this.props.category || "All Posts"}</h1>
                    <div className="sorter-container">
                        <div className="sorter">Sort by:&nbsp;
                            <select value={ this.props.sortby } onChange={(event)=> (this.props.changeSortBy(event.target.value))} className="sorter-select">
                                <option value="title">Title</option>
                                <option value="-timestamp">Newest</option>
                                <option value="timestamp">Oldest</option>
                                <option value="-voteScore">Best rating</option>
                                <option value="voteScore">Worst rating</option>
                            </select>
                        </div>
                        <div className="search">Search: <input type="text" className="search-input" value={this.props.searchquery} onChange={(event)=> (this.props.updateQuery(event.target.value))}/></div>
                    </div>
                </div>
                {
                    //order list based value in dropdown list and remove any deleted posts.
                    postList.sort(sortBy(this.props.sortby)).filter((item) => (!item.deleted)).map((item) => (
                        <div key={item.id} className="card-link" >
                            <div className="card">
                                <div className="card-content">
                                        <div className="vote-score">


                                            <span className="bold-item">Rating:</span> { item.voteScore }
                                            <span className="vote-buttons">
                                                <a className="vote-button" onClick={(e) => { e.preventDefault(); this.props.goVote("upVote", "post", item.id)}}>
                                                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                                </a>
                                                <a className="vote-button" onClick={(e) => { e.preventDefault();this.props.goVote("downVote", "post", item.id)}}>
                                                    <i className="fa fa-thumbs-down" aria-hidden="true"> </i>
                                                </a>
                                            </span>


                                        </div>
                                        <div className="title"><Link to={`/${item.category}/${item.id}`}>{item.title}</Link></div>
                                        <div className="author">{item.author}</div>
                                        <div className="comments">{ (comments[item.id]) ? comments[item.id].length : 0 }comments</div>
                                        <div className="date">{ helpers.formatDate(item.timestamp) }</div>
                                        <div className="buttons"><a onClick={(e) => { e.preventDefault(); this.deletePost(item.id)}}>Delete</a> | <Link to={`/editPost/${item.id}`}>Edit</Link></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    };
};

function mapDispatchToProps (dispatch) {
  return {
    updateList: (data) => dispatch(getPosts(data)),
    changeSortBy: (data) => dispatch(sortListBy(data)),
    updateQuery: (data) => dispatch(seachListBy(data)),
    changeCategory: (category) => dispatch(selectCategory(category)),
    getAllComments: () => dispatch(retreiveAllComments()),
    goVote: (action, type, id) => dispatch(vote(action, type, id)),
    deletePost: (id) => dispatch(removePost(id)),
    goToURL: (url) => dispatch(push(url)),
  }
}

function mapStateToProps(state, routingDetails) {
    return {
        category: routingDetails.match.params.category,
        url: routingDetails.match.url,
        postlist: state.postList.postlist,
        sortby: state.postList.sortBy,
        searchquery: state.postList.searchQuery,
        comments: state.comments.commentList
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts);