import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import {
  UPDATE_POST_LIST,
  UPDATE_CATEGORY_LIST,
  OPEN_NAV_MENU
} from '../actions'

const nav_initialState = {
  navMenu: false,
  categories: []
}

function navBar (state = nav_initialState, action) {
  switch (action.type) {
    case UPDATE_CATEGORY_LIST :
      const { categories } = action

      return {
        ...state,
        categories
      }
    case OPEN_NAV_MENU :
      return {
        ...state,
        navMenu: !state.navMenu
      }
    default :
      return state
  }
}

const postList_initialState = {
  postlist: []
}

function postList (state = postList_initialState, action) {
  switch (action.type) {
    case UPDATE_POST_LIST :
      const { postlist } = action

      return {
        ...state,
        postlist
      }
    default :
      return state
  }
}

export default combineReducers({
  navBar: navBar,
  postList: postList,
  routing: routerReducer
});



