import { GLOBALTYPES } from './globalTypes'
import { getDataAPI, patchDataAPI, postDataAPI } from '@utils/fetchData'
import { imageUpload } from '@utils/imageUpload'

export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST',
}

export const createPost =
  ({ content, images, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
      //   if(images.length > 0) media =await imageUpload(images)

      const res = await postDataAPI('posts', { content, images: [] }, auth.token)

      dispatch({ type: POST_TYPES.CREATE_POST, payload: res.data.newPost })

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      })
    }
  }
