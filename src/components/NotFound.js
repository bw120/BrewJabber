import React, { Component } from 'react'

class NotFound extends Component {
    render() {
      return (
        <div className="main-container">
            <div className="post">
                <div className="post-header">
                    <div className="post-error">Sorry, we were not able to find what you are looking for.</div>
                </div>
            </div>
        </div>
      );
    }
}

export default NotFound;