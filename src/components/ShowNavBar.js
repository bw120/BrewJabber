import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as API from '../utils/api'
import { updateCategoryList, openNavMenu } from '../actions'

class ShowNavBar extends Component {

    componentDidMount = () => {

        API.getCategories().then((categories) => {
            this.props.setCategories(categories);
        });

    };

    toggleMenu = (e) => {
        e.preventDefault();
        this.props.activateMenu();
    }

    render() {
        return (
          <nav>
            <div className="top-bar-container">
                <div className="top-bar">
                    <div className="nav-buttons">
                        <div className="category-outer-container">
                            <span className="category-label hideMobile">Topic: </span>
                            <div className="category-container"><div className="selected-category">
                                <a href="" onClick={this.toggleMenu}>
                                    <span className="selected-label hideMobile">Selected Topic</span>
                                    <span className="hamburger"></span>
                                </a>
                            </div>
                            { this.props.nav && (
                            <ul className="categories" onMouseLeave={ this.toggleMenu }>
                                <li className="category showMobile"><Link className="category-link" to="/modifyPost/">+ Add Post</Link></li>
                                <li className="category showMobile"><span className="menu-header" >Categories:</span></li>
                                {
                                    this.props.categories.map((item) => (
                                        <li key={item.name} onClick={ this.toggleMenu } className="category"><Link className="category-link sub" to={`/category/${item.name}`}>{item.name}</Link></li>
                                    ))
                                }
                            </ul>)}
                            </div>
                        </div>
                        <div className="addPost hideMobile"><Link to="/modifyPost/">+ Add Post</Link></div>
                    </div>


                    <div className="logo"><Link to="/"><img className="logo-img" src="../images/BrewJabber_logo.svg" alt="Brew Jabber" width="175"/></Link></div>
                </div>
            </div>
          </nav>
        )

    };
};

function mapStateToProps(state) {
    return {
        categories: state.userInterface.categories,
        nav: state.userInterface.navMenu
    };
}

function mapDispatchToProps (dispatch) {
  return {
    setCategories: (data) => dispatch(updateCategoryList(data)),
    activateMenu: () => dispatch(openNavMenu())
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowNavBar);

// export default ShowNavBar;