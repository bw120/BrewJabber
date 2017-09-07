import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import {
  UPDATE_POST_LIST,
  UPDATE_CATEGORY_LIST,
  OPEN_NAV_MENU
} from '../actions'

const UI_initialState = {
  postlist: [],
  categories: [],
  navMenu: false
}

function userInterface (state = UI_initialState, action) {
  switch (action.type) {
    case UPDATE_POST_LIST :
      const { postlist } = action

      return {
        ...state,
        postlist
      }
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



export default combineReducers({
  userInterface: userInterface,
  routing: routerReducer
});



