import React, { Component } from 'react'
import { connect } from 'react-redux'

class ListAllPosts extends Component {

    render() {
        return (
            <div>
                <div>Post List</div>
                <div>Post ID {this.props.category}</div>
            </div>
        )

    };
};

function mapStateToProps(routing, routingDetails) {
    const category = routingDetails.match.params.category;
    return {
        category: category
    };
}

export default connect(
  mapStateToProps
)(ListAllPosts);