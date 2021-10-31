import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'

const reducer = combineReducers({
  auth,
  alert,
})
export default reducer
