import { getDataAPI, patchDataAPI } from '@utils/fetchData'
import { imageUpload } from '@utils/imageUpload'
import { DeleteData, GLOBALTYPES } from './globalTypes'

export const PROFILE_TYPES = {
  LOADING: 'LOADING',
  GET_USER: 'GET_USER',
  FOLLOW: 'FOLLOW',
  UNFOLLOW: 'UNFOLLOW',
}

export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true })
        const res = await getDataAPI(`/user/${id}`, auth.token)
        dispatch({
          type: PROFILE_TYPES.GET_USER,
          payload: res.data,
        })
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false })
      } catch (error) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        })
      }
    }
  }

export const updateProfileUser =
  ({ userData, avatar, auth }) =>
  async (dispatch) => {
    if (!userData.fullname)
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Please add your full name.' } })

    if (userData.fullname.length > 25)
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Your full name too long.' } })

    if (userData.story.length > 200)
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Your story too long.' } })

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

      //   if (avatar) media = await imageUpload([avatar])

      const res = await patchDataAPI(
        'user',
        {
          ...userData,
          // avatar: avatar ? media[0].url : auth.user.avatar
        },
        auth.token
      )
      console.log(res)

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      })

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      })
    }
  }

export const follow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    let newUser = { ...user, followers: [...user.followers, auth.user] }

    dispatch({
      type: PROFILE_TYPES.FOLLOW,
      payload: newUser,
    })
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { ...auth, user: { ...auth.user, following: [...auth.user.following, newUser] } },
    })
  }

export const unfollow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    // let newUser = { ...user, followers: [...user.followers.filter((item) => item._id !== auth.user._id)] }
    let newUser = { ...user, followers: DeleteData(user.followers, auth.user._id) }
    console.log(newUser)
    dispatch({
      type: PROFILE_TYPES.UNFOLLOW,
      payload: newUser,
    })
    dispatch({
      type: GLOBALTYPES.AUTH,
      // payload: { ...auth, following: auth.user.following.filter((item) => item._id !== newUser._id) },
      payload: { ...auth, user: { ...auth.user, following: DeleteData(auth.user.following, newUser._id) } },
    })
  }
