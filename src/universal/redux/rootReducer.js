import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import initialState from './initialState'

const appReducer = combineReducers(
  {
    routing: routerReducer,
  },
  initialState,
)

export default (state, action) => appReducer(state, action)
