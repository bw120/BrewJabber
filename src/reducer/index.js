import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import {
  ADD_RECIPE,
  REMOVE_FROM_CALENDAR,
} from '../actions'

const initialState = {
  test: []
}

function dummyRecucer1 (state = initialState, action) {
  switch (action.type) {
    case ADD_RECIPE :
      const { recipe } = action

      return {
        ...state,
        [recipe.label]: recipe,
      }
    default :
      return state
  }
}

function dummyRecucer2 (state = initialState, action) {
  switch (action.type) {
    case ADD_RECIPE :
      const { recipe } = action

      return {
        ...state,
        [recipe.label]: recipe,
      }
    default :
      return state
  }
}


export default combineReducers({
  dummyRecucer1: dummyRecucer1,
  dummyRecucer2: dummyRecucer2,
  routing: routerReducer
});



