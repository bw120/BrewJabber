import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as API from '../utils/api'
import { updateCategoryList, openNavMenu, selectCategory } from '../actions'

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

    handleSelectCategory = (category) => {
        this.props.changeCategory(category);
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
                                    <span className="selected-label hideMobile">
                                        {(this.props.selectedCategory.length > 0 && this.props.categories.filter((item) => (this.props.selectedCategory === item.path)).length > 0)? this.props.selectedCategory : "All Topics"}
                                    </span>
                                    <span className="hamburger"></span>
                                </a>
                            </div>
                            { this.props.nav && (
                            <ul className="categories" onMouseLeave={ this.toggleMenu }>
                                <li className="category showMobile"><Link className="category-link" to="/editPost/">+ Add Post</Link></li>
                                <li className="category showMobile"><span className="menu-header" >Categories:</span></li>
                                <li onClick={ (e)=> {e.preventDefault(); this.handleSelectCategory("")} } className="category"><Link className="category-link sub" to={"/"}>All Topics</Link></li>
                                {
                                    this.props.categories.map((item) => (
                                        <li key={item.name} onClick={ (e)=> {e.preventDefault(); this.handleSelectCategory(item.path)} } className="category"><Link className="category-link sub" to={`/${item.path}`}>{item.name}</Link></li>
                                    ))
                                }
                            </ul>)}
                            </div>
                        </div>
                        <div className="addPost hideMobile"><Link to="/editPost/">+ Add Post</Link></div>
                    </div>


                    <div className="logo"><Link to="/"><img className="logo-img" src="/images/BrewJabber_logo.svg" alt="Brew Jabber" width="175"/></Link></div>
                </div>
            </div>
          </nav>
        )

    };
};

function mapStateToProps(state) {
    return {
        categories: state.navBar.categories,
        nav: state.navBar.navMenu,
        selectedCategory: state.navBar.selectedCategory,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCategories: (data) => dispatch(updateCategoryList(data)),
        activateMenu: () => dispatch(openNavMenu()),
        changeCategory: (category) => dispatch(selectCategory(category))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowNavBar);

// export default ShowNavBar;