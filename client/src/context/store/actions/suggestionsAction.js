import { getDataAPI } from '@utils/fetchData'
import { GLOBALTYPES } from './globalTypes'

export const SUGGEST_TYPES = {
  LOADING: 'LOADING_SUGGEST',
  GET_USERS: 'GET_USERS, SUGGESST',
}

export const getSuggestions = (token) => async (dispatch) => {
  try {
    dispatch({ type: SUGGEST_TYPES.LOADING, payload: true })

    const res = await getDataAPI('suggestionsUser', token)
    console.log(res)
    dispatch({ type: SUGGEST_TYPES.GET_USERS, payload: res.data })

    dispatch({ type: SUGGEST_TYPES.LOADING, payload: false })
  } catch (error) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
  }
}
