import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import skills from './skills'
import userSkills from './userSkills'

const reducer = combineReducers({skills, userSkills})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

//SAMPLE code if we want to use localStorage
// store.subscribe(() => {
//   if (!store.getState().user.id) {
//     localStorage.setItem('localCart', JSON.stringify(store.getState().cart))
//   }
// })

export default store

export * from './skills'
export * from './userSkills'
