import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import profile from './profileReducer'
import status from './statusReducer'

const reducer = combineReducers({
  auth,
  alert,
  profile,
  status,
})
export default reducer
