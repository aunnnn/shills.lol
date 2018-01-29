import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import APIService from './utils/APIService'

const initialState = {
  allLists: [],
  introLists: []
}

// types
export const actionTypes = {
  GET_ALL_LISTS: 'GET_ALL_LISTS',
  GET_INTRO_LISTS: 'GET_INTRO_LISTS'
}

// reducers
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_LISTS:
      return { ...state, allLists: action.allLists }
    case actionTypes.GET_INTRO_LISTS:
      return { ...state, introLists: action.introLists }
    default:
      return state
  }
}

// actions
export const getAllLists = () => dispatch => {
  APIService.getAllLists()
    .then(res => {
      console.log(res.data)
      dispatch({
        type: actionTypes.GET_ALL_LISTS,
        allLists: res.data.all_lists
      })
    })
}

export const getIntroLists = () => dispatch => {
  APIService.getIntroLists()
    .then(res => {
      console.log(res.data)
      dispatch({
        type: actionTypes.GET_INTRO_LISTS,
        introLists: res.data.intro_lists
      })
    })
}

export const addNewDefinition = (listId, text) => dispatch => {
  APIService.addNewDefinition(listId, text)
    .then(res => {
      console.log(res)
    })
}

// init store
export const initStore = (state = initialState) => {
  return createStore(reducer, state, composeWithDevTools(applyMiddleware(thunk, logger)))
}
