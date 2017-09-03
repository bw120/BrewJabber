import React, { Component } from 'react';
import '../css/App.css';
import { Route } from 'react-router-dom'
import ShowPostDetails from './ShowPostDetails';
import ListAllPosts from './ListAllPosts';
import ModifyPost from './ModifyPost';

class App extends Component {

  render() {
    return (
          <div className="app">

            {/* Main page route - list all posts */}

            <Route exact path="/" component={ListAllPosts} />

            {/* Category route  - list posts for category */}

            <Route exact path="/category/:category" component={ListAllPosts} />

            {/* Post details route */}

            <Route exact path="/post/:id" component={ShowPostDetails} />

            {/* Modify post route */}

            <Route path="/modifyPost/:id" component={ModifyPost} />

          </div>
    );
  }
}

export default App;
