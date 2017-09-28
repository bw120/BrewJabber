import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editOrAddComment } from '../actions/thunks'
import * as helpers from '../utils/helpers'


class EditComment extends Component {

    state = {
      data: {
        id: null,
        parentId: null,
        timestamp: null,
        body: '',
        author: '',
        voteScore: null,
      },
      valid: {
        author: true,
        body: true
      }
    }

    componentDidMount = () => {
      //If it is an existing comment, get data
      const { author, body, voteScore, timestamp} = this.props.comment || "";
      const { commentId, postID } = this.props || "";
        this.setInitialData(commentId, postID, body, author, voteScore, timestamp);
    };

    //variable to store whether we are updating or creating new comment
    newComment = false;

    setInitialData = (id, parentId, body, author, voteScore, timestamp) => {

      //assign a comment ID if not present and mark this as a new comment
      let uuid;
      if (id != null) {
        uuid = id;
      } else {
        uuid = helpers.createUUID();
        this.newComment = true;
      }

      let data = {
        id: uuid,
        parentId,
        timestamp,
        body: body || "",
        author: author || "",
        voteScore
      }
      this.setState({data: data});
    }

    //update controlled inputs
    updateFormField = (field, value) => {
      this.setState({
        data: {...this.state.data,
                  [field]: value
              }});
    }

    //checks if user has added information to each field
    validate = () => {
      let formValid = true;
      let fields = this.state.valid;
      Object.keys(fields).forEach((item) => {
        if (this.state.data[item].length > 0) {
          fields[item] = true;
        } else {
          fields[item] = false;
          formValid = false;
        }
      });
      this.setState( {valid: fields });
      return formValid;
    }

    //finalizes data and submits
    submitComment = () => {
      if (this.validate()) {
        const id = this.state.data.id;
        let comment = this.state.data;
        comment.timestamp = new Date().getTime();
        comment.voteScore = (this.newComment)? 1 : this.state.data.voteScore;
        this.props.addEditComment(comment, (this.newComment)? null : id);
      }
    }

    render() {
      const { author, body } = this.state.data;
        return (
            <div className="edit-comment-item">
                <div className="comment-body">
                  <div className="form-group">
                    <label htmlFor="authorName">Your Name: <span className="error">{ (this.state.valid.author === false) && ("Please enter your name")}</span></label>
                    <input
                      className="edit-comment-field"
                      id="authorName"
                      value={ author }
                      onChange={(event) => this.updateFormField("author", event.target.value)}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="body">Comment: <span className="error">{ (this.state.valid.body === false) && ("Please enter a comment")}</span></label>
                    <textarea
                      className="edit-comment-field"
                      id="body"
                      value={ body }
                      onChange={(event) => this.updateFormField("body", event.target.value)}>
                    </textarea>
                  </div>
                </div>
                <div className="form-group">
                    <button onClick={(e) => {e.preventDefault(); this.submitComment() }}>Save</button>
                </div>
            </div>
        )
    };
};

function mapDispatchToProps (dispatch) {
  return {
    addEditComment: (comment, commentID) => dispatch(editOrAddComment(comment, commentID)),
  }
}

function mapStateToProps(state, routingDetails) {
    return {
      comment: state.postDetails.comments.filter((item) => (item.id === state.modalWindow.itemId))[0],
      commentId: state.modalWindow.itemId,
      postID: state.postDetails.postDetails.id
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditComment);
