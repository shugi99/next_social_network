import { DeleteData, EditData } from '../actions/globalTypes'
import { POST_TYPES } from '../actions/postAction'

const initialState = {
  posts: [],
  loading: false,
  result: 0,
  page: 2,
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }
    case POST_TYPES.LOADING_POSTING_POST:
      return {
        ...state,
        loading: action.payload,
      }
    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        page: action.payload.page,
      }
    case POST_TYPES.UPDATE_POST:
      return {
        ...state,
        posts: EditData(state.posts, action.payload._id, action.payload),
      }
    case POST_TYPES.DELETE_POST:
      return {
        ...state,
        posts: DeleteData(state.posts, action.payload._id),
      }
    default:
      return state
  }
}

export default postReducer
