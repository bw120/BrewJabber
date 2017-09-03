import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as API from '../utils/api'

class ShowPostDetails extends Component {

    state = {
        categories: []
    };

    componentDidMount = () => {
        API.getCategories().then((categories) => {
            this.setState({ categories: categories })
        })
    };

    render() {
        console.log(this.state);
        return (
            <div>
            <div>Post ID {this.props.id}</div>
            <Link to="/">main page</Link>
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
)(ShowPostDetails);