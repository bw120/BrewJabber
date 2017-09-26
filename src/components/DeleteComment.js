import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { toggleModalWindow } from '../actions'
import { removeComment } from '../actions/thunks'


class DeleteComment extends Component {

    render() {
        return (
            <div className="">
              <div className="modal-message">Are you sure you want to delete this comment?</div>
              <button onClick={(e) => { e.preventDefault(); this.props.delete(this.props.itemID)}}>Delete Comment</button>
            </div>
        )
    };
};

function mapDispatchToProps (dispatch) {
  return {
    delete: (id)=> dispatch(removeComment(id))
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
)(DeleteComment);

