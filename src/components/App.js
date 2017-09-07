import React, { Component } from 'react';
import '../css/App.css';

import { Route } from 'react-router-dom'
import ShowPostDetails from './ShowPostDetails';
import ListPosts from './ListPosts';
import ModifyPost from './ModifyPost';
import ShowNavBar from './ShowNavBar';


class App extends Component {

  render() {
    return (
        <div>
          <ShowNavBar/>
          <main>


              {/* Main page route - list all posts */}

              <Route exact path="/" component={ ListPosts } />

              {/* Category route  - list posts for category */}

              <Route exact path="/category/:category" component={ ListPosts } />

              {/* Post details route */}

              <Route exact path="/post/:id" component={ ShowPostDetails } />

              {/* Modify post route */}

              <Route path="/modifyPost/:id" component={ ModifyPost } />


          </main>
        </div>
    );
  }
}

export default App;
