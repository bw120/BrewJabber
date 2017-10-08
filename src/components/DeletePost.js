import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import { removePost } from '../actions/thunks'


class DeletePost extends Component {

    deleteThisPost = (id) => {
        this.props.deletePost(id);
        this.props.goToURL("/");
    }

    render() {
        return (
            <div className="">
              <div className="modal-message">Are you sure you want to delete this post?</div>
              <button onClick={(e) => { e.preventDefault(); this.deleteThisPost(this.props.itemID)}}>Delete Post</button>
            </div>
        )
    };
};

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (id) => dispatch(removePost(id)),
    goToURL: (url) => dispatch(push(url)),
  }
}

function mapStateToProps(state, routingDetails) {
    return {
      itemID: state.modalWindow.itemId
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePost);

