import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as API from '../utils/api'
import * as helpers from '../utils/helpers'
import { updatePostList } from '../actions'
import Link from 'react-router-redux-dom-link';
import sortBy from 'sort-by'


class ListPosts extends Component {

    componentDidMount = () => {
        this.updatePostList(this.props.category);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== this.props.url) {
          this.updatePostList(nextProps.category);
        }
    }

    updatePostList = (category) => {
        if (typeof(category) !== "undefined") {
            API.getPostsByCategory(category).then((posts) => {
                this.props.updateList(posts);
            });
        } else {
            API.getAllPosts().then((posts) => {
                this.props.updateList(posts);
            });
        }
    }

    render() {
        return (
            <div className="main-container">
                <div className="list-header">
                    <h1 className="category-header">{this.props.category || "All Posts"}</h1>
                    <div className="sorter-container">
                        <div className="sorter">Sort by:
                            <select className="sorter-select">
                                <option>Rating</option>
                                <option>Date</option>
                                <option>Alphabetical by title</option>
                            </select>
                        </div>
                        <div className="search">Search: <input type="text" className="search-input"/></div>
                    </div>
                </div>
                {
                    this.props.postlist.map((item) => (
                        <Link key={item.id} className="card-link" to={`/post/${item.id}`}>
                            <div className="card">
                                <div className="card-content">
                                    <div className="vote-score"><i className="fa fa-thumbs-up" aria-hidden="true"> </i> {item.voteScore}</div>
                                    <div className="title">{item.title}</div>
                                    <div className="date">{ helpers.formatDate(item.timestamp) }</div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        )
    };
};

function mapDispatchToProps (dispatch) {
  return {
    updateList: (data) => dispatch(updatePostList(data))
  }
}

function mapStateToProps(state, routingDetails) {
    const category = routingDetails.match.params.category;
    return {
        category: category,
        url: routingDetails.match.url,
        postlist: state.postList.postlist
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts);