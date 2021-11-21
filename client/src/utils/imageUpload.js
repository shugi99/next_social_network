import Resizer from 'react-image-file-resizer'
import { postDataAPI } from './fetchData'

export const checkImage = (file) => {
  let err = ''
  if (!file) return (err = 'File does not exist.')

  if (file.size > 1024 * 1024)
    // 1mb
    err = 'The largest image size is 1mb.'

  if (file.type !== 'image/jpeg' && file.type !== 'image/png') err = 'Image format is incorrect.'

  return err
}

export const imageUpload = (images, token) =>
  new Promise((resolve, reject) => {
    let imgArr = []
    for (const item of images) {
      Resizer.imageFileResizer(
        item,
        720,
        720,
        'JPEG',
        100,
        0,
        async (uri) => {
          try {
            const res = await postDataAPI('uploadimages', { image: uri }, token)
            imgArr.push(res.data)
            if (imgArr.length === images.length) {
              resolve(imgArr)
            }
          } catch (error) {
            console.log(error)
            reject(error)
          }
        },
        'base64'
      )
    }
  })
