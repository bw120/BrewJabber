import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as helpers from '../utils/helpers'
import { sortListBy, seachListBy } from '../actions'
import { getPosts } from '../actions/thunks'
import Link from 'react-router-redux-dom-link';
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'


class ListPosts extends Component {

    componentDidMount = () => {
        this.props.updateList(this.props.category);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== this.props.url) {
          this.props.updateList(nextProps.category);
        }
    }

    render() {
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
                    postList.sort(sortBy(this.props.sortby)).filter((item) => (!item.deleted)).map((item) => (
                        <Link key={item.id} className="card-link" to={`/post/${item.id}`}>
                            <div className="card">
                                <div className="card-content">
                                    <div className="vote-score">
                                        {(item.voteScore >= 0) ?
                                            (<i className="fa fa-thumbs-up" aria-hidden="true"> </i> ) : (<i className="fa fa-thumbs-down" aria-hidden="true"> </i> )}
                                        &nbsp;{item.voteScore}</div>
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
    updateList: (data) => dispatch(getPosts(data)),
    changeSortBy: (data) => dispatch(sortListBy(data)),
    updateQuery: (data) => dispatch(seachListBy(data))
  }
}

function mapStateToProps(state, routingDetails) {
    const category = routingDetails.match.params.category;
    return {
        category: category,
        url: routingDetails.match.url,
        postlist: state.postList.postlist,
        sortby: state.postList.sortBy,
        searchquery: state.postList.searchQuery
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts);