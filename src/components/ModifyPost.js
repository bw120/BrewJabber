import React, { Component } from 'react'
import { connect } from 'react-redux'


class ModifyPost extends Component {

    render() {
        return (
            <div>
                <div>Modify Post</div>
                <div>Post ID {this.props.id}</div>
            </div>
        )

    };
};

function mapStateToProps(routing, routingDetails) {
    const id = routingDetails.match.params.id;
    return {
        id: id
    };
}

export default connect(
  mapStateToProps
)(ModifyPost);