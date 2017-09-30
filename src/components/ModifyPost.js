import React, { Component } from 'react'
import { connect } from 'react-redux'
import { retreivePostDetails } from '../actions/thunks'
import * as helpers from '../utils/helpers'
import { editOrAddPost } from '../actions/thunks'
import { push } from 'react-router-redux';

class ModifyPost extends Component {

    componentDidMount = () => {
        this.checkIfExistingPost(this.props.id);
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.postDetails !== this.props.postDetails) {
            this.checkIfExistingPost(nextProps.id);
        }
    }

    //variable to store whether we are updating or creating new Post
    newPost = false;

    checkIfExistingPost = (propsId) => {
        //if no id present it is new post and should set default state
        if (typeof(propsId) === 'undefined') {
            this.setState(this.defaultState);
            this.newPost = true;
            return;
        }

        //confirm if post data is already in state. If not get it
        if (typeof(this.props.postDetails.id) === 'undefined') {
            this.props.getPostDetails(propsId);
        }

        //set initial data based on data in store
        let { id, category, body, author, title, timestamp } = this.props.postDetails || "";
        this.setInitialData(id, category, body, author, title, timestamp);

    }

    defaultState = {
      data: {
        id: helpers.createUUID(),
        category: this.props.category,
        timestamp: null,
        title: '',
        body: '',
        author: ''
      },
      valid: {
        author: true,
        body: true,
        title: true,
        category: true,
      }
    }

    state = this.defaultState;

    setInitialData = (id, category, body, author, title, timestamp) => {

      let data = {
        id,
        category: category || this.props.category,
        timestamp,
        body: body || "",
        author: author || "",
        title: title || ""
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
    submitPost = () => {
      if (this.validate()) {
        const id = this.state.data.id;
        let post = this.state.data;
        post.timestamp = new Date().getTime();
        post.voteScore = (this.newPost)? 1 : this.state.data.voteScore;
        this.props.addEditPost(post, (this.newPost)? null : id);
        this.props.goToURL(`/post/${id}`);
      }
    }

    render() {
        return (
          <div className="main-container">
              <div className="post">
                  <div className="post-header">
                      <div className="post-back"><button onClick={()=> (this.props.history.goBack())}>Go Back</button></div>
                      <div className="post-title">{(this.props.id)? ("Edit Post") : ("New Post")}</div>
                      <div className="post-attributes">
                          <label htmlFor="post-title" className="post-edit-label">Post Title: <span className="error">{ (this.state.valid.title === false) && ("Please enter a title")}</span></label>
                          <input
                            type="text"
                            id="post-title"
                            className="post-edit-input"
                            onChange={(event) => this.updateFormField("title", event.target.value)}
                            value={this.state.data.title} />
                      </div>
                      <div className="post-attributes">
                          <label className="post-edit-label" htmlFor="post-name">Your Name: <span className="error">{ (this.state.valid.author === false) && ("Please enter your name")}</span></label>
                          <input
                            id="post-name"
                            type="text" className="post-edit-input"
                            onChange={(event) => this.updateFormField("author", event.target.value)}
                            value={this.state.data.author} />
                      </div>
                      <div className="post-attributes">
                          <label className="post-edit-label" htmlFor="post-category">Category: <span className="error">{ (this.state.valid.category === false) && ("Please enter your name")}</span></label>
                          <select
                            id="post-category"
                            type="text"
                            className="post-edit-input"
                            onChange={(event) => this.updateFormField("category", event.target.value)}
                            value={this.state.data.category}>
                                <option value=""> Select a catetory </option>
                                {
                                    this.props.categories.map((item) => (
                                        <option key={item.path} value={item.name}>{item.name}</option>
                                        )
                                    )
                                }
                          </select>
                      </div>
                  </div>
                  <div className="post-edit-body">
                      <label className="post-edit-label" htmlFor="post-body">Post body: <span className="error">{ (this.state.valid.body === false) && ("Please enter the body of your post")}</span></label>
                      <textarea
                        id="post-body"
                        onChange={(event) => this.updateFormField("body", event.target.value)}
                        value={this.state.data.body}>
                      </textarea>
                  </div>
                  <div className="post-controls">
                      <div className="submit">
                          <button onClick={(e) => {e.preventDefault(); this.submitPost() }}>Save</button>
                      </div>
                  </div>
              </div>
          </div>
        )

    };
};

function mapStateToProps(state, routingDetails) {
    const id = routingDetails.match.params.id;
    return {
        id: id,
        postDetails: state.postDetails.postDetails,
        categories: state.navBar.categories,
        category: state.navBar.selectedCategory
    };
}

function mapDispatchToProps (dispatch) {
  return {
    addEditPost: (post, postID) => dispatch(editOrAddPost(post, postID)),
    getPostDetails: (data) => dispatch(retreivePostDetails(data)),
    goToURL: (url) => dispatch(push(url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifyPost);