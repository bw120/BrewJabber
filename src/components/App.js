import React, { Component } from 'react';
import '../css/App.css';
import { Route , Switch } from 'react-router-dom'
import ShowPostDetails from './ShowPostDetails';
import ListPosts from './ListPosts';
import ModifyPost from './ModifyPost';
import ShowNavBar from './ShowNavBar';
import NotFound from './NotFound';


class App extends Component {

  render() {
    return (
        <div>

          <ShowNavBar/>

          <main>
            <Switch>

              {/* Main page route - list all posts */}

              <Route exact path="/" component={ ListPosts }/>

              {/* Modify post route */}

              <Route path="/editPost/:id?" component={ ModifyPost } />

              {/* Category route  - list posts for category */}

              <Route exact path="/:category" component={ ListPosts } />

              {/* Post details route */}

              <Route exact path="/:category/:id" component={ ShowPostDetails } />

              {/* Route not found */}

              <Route component={ NotFound } />

            </Switch>

          </main>
        </div>
    );
  }
}

export default App;
