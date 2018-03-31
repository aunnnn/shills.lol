import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import APIService from './utils/APIService'

const initialState = {
  allLists: [],
  introLists: [],
  currentList: null,
  loadingCurrentList: false,
  submittingAddDefinition: false,
  currentInputText: null,
}

// types
export const actionTypes = {
  GET_ALL_LISTS: 'GET_ALL_LISTS',
  GET_INTRO_LISTS: 'GET_INTRO_LISTS',
  GET_LIST: 'GET_LIST',
  GET_LIST_LOADING: 'GET_LIST_LOADING',
  ADD_DEFINITION_DONE: 'ADD_DEFINITION_DONE',
  ADD_DEFINITION_LOADING: 'ADD_DEFINITION_LOADING',
}

// reducers
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_LISTS:
      return { ...state, allLists: action.allLists }
    case actionTypes.GET_INTRO_LISTS:
      return { ...state, introLists: action.introLists }
    case actionTypes.GET_LIST:
      return { ...state, currentList: action.currentList, loadingCurrentList: false, }
    case actionTypes.GET_LIST_LOADING:
      return { ...state, currentList: null, loadingCurrentList: true, }

    case actionTypes.ADD_DEFINITION_LOADING:
      return { ...state, submittingAddDefinition: true, currentInputText: action.currentList, }
    case actionTypes.ADD_DEFINITION_DONE:
      return { ...state, submittingAddDefinition: false, currentInputText: null, }
    default:
      return state
  }
}

// actions
export const getAllLists = () => dispatch => {
  return APIService.getAllLists()
    .then(res => {
      dispatch({
        type: actionTypes.GET_ALL_LISTS,
        allLists: res.data.all_lists
      })
    })
}

export const getIntroLists = () => dispatch => {
  return APIService.getIntroLists()
    .then(res => {
      dispatch({
        type: actionTypes.GET_INTRO_LISTS,
        introLists: res.data.intro_lists
      })
    })
}

export const getList = (coin_symbol) => dispatch => {
  // dispatch({ type: actionTypes.GET_LIST_LOADING })
  return APIService.getList(coin_symbol)
    .then(res => {
      dispatch({
        type: actionTypes.GET_LIST,
        currentList: res.data.list,
      })
    })
}

export const addNewDefinitionLoading = (text) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_DEFINITION_LOADING,
    currentInputText: text,
  })
}

export const addNewDefinition = (listId, text) => dispatch => {
  return APIService.addNewDefinition(listId, text)
    .then(res => {
      dispatch({
        type: actionTypes.ADD_DEFINITION_DONE,
      })
      return APIService.getList(res.data.symbol)
    })
    .then(res => {
      dispatch({
        type: actionTypes.GET_LIST,
        currentList: res.data.list,
      })
    })
}

// init store
export const initStore = (state = initialState) => {
  const middlewares = [thunk]
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  return createStore(reducer, state, composeWithDevTools(applyMiddleware(...middlewares)))
}
