import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise-middleware'
import reduxLogger from 'redux-logger'
import rootReducer from './reducers'

const middleware = [reduxPromise, reduxLogger]

export default createStore(rootReducer, applyMiddleware(...middleware))