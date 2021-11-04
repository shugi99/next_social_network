import { GLOBALTYPES } from '@context/store/actions/globalTypes'
import { CameraIcon, PhotographIcon, XIcon } from '@heroicons/react/outline'
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const StatusModal = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [stream, setStream] = useState(false)

  const videoRef = useRef()
  const canvasRef = useRef()
  const [tracks, setTracks] = useState('')

  const handleChangeImages = (e) => {
    const files = [...e.target.files]
    let err = ''
    let newImages = []

    files.forEach((file) => {
      if (!file) return (err = 'File does not exist')

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return (err = 'Upload jpeg and png files')
      }

      return newImages.push(file)
    })

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
    setImages([...images, ...newImages])
  }

  const deleteImages = (index) => {
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
  }

  const handleStream = () => {
    setStream(true)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream
          videoRef.current.play()
          const track = mediaStream.getTracks()
          setTracks(track[0])
        })
        .catch((err) => console.log(err))
    }
  }

  const handleCapture = () => {
    const width = videoRef.current.clientWidth
    const height = videoRef.current.clientHeight

    canvasRef.current.setAttribute('width', width)
    canvasRef.current.setAttribute('height', height)

    const ctx = canvasRef.current.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, width, height)
    let URL = canvasRef.current.toDataURL()
    setImages([...images, { camera: URL }])
  }

  const handleStopStream =()=>{
    tracks.stop()
    setStream(false)
  }

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full overflow-auto bg-indigo-100 bg-opacity-40 pt-60 ">
      <div className="relative p-4 px-6  w-full max-w-[450px] mx-auto font-medium text-gray-500 bg-white border-2 border-gray-200 shadow-md rounded-2xl">
        <h1 className="pb-2 text-xl font-semibold">Create Post</h1>
        <form className="flex flex-1 ">
          <textarea
            name="content"
            rows={3}
            className="min-h-[150px] flex-grow p-1 px-5 bg-gray-100 rounded-lg focus:outline-none"
            placeholder={`${auth.user.username}, what are you thinking?`}
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
        <div className="w-100 max-h-[250px] overflow-y-auto flex flex-wrap place-items-center pt-6">
          {images &&
            images.map((img, index) => (
              <div key={index} id="file_img" className="relative w-1/3 p-1 h-28 border-1 ">
                <img src={img.camera ? img.camera : URL.createObjectURL(img)} alt="images" className="block object-cover w-full h-full" />
                <XIcon
                  className="absolute inset-y-0 right-0 flex items-center w-8 h-8 p-2 text-red-500 bg-red-100 rounded-full cursor-pointer top-2"
                  aria-hidden="true"
                  onClick={() => deleteImages(index)}
                />
              </div>
            ))}
        </div>
        {stream && (
          <div className="relative">
            <video autoPlay muted ref={videoRef} />
            <XIcon
              className="absolute inset-y-0 right-2 flex items-center w-8 h-8 p-2 text-red-500 bg-red-100 rounded-full cursor-pointer top-2"
              aria-hidden="true"
              onClick={handleStopStream}
            />
            {/* <canvas ref={canvasRef} className="hidden" /> */}
          </div>
        )}
        <div className="items-center p-4 space-x-4">
          {stream ? (
            <div className="flex items-center justify-center cursor-pointer">
              <CameraIcon className="w-10 h-10 cursor-pointer" onClick={handleCapture} />
            </div>
          ) : (
            <div className="flex items-center justify-center ">
              <div>
                <CameraIcon className="w-10 h-10 cursor-pointer" onClick={handleStream} />
              </div>
              <div className="relative flex items-center  justify-center overflow-hidden ">
                <PhotographIcon className="w-10 h-10 cursor-pointer " />
                <input
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  accept="image/*"
                  className="absolute top-0 left-0 border-2 opacity-0 cursor-pointer"
                  onChange={handleChangeImages}
                />
                
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 text-sm font-medium text-white bg-indigo-700 border border-transparent rounded-md shadow-sm py-my-2 px-22 flex-grow-1 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Post
        </button>

        <XIcon
          className="absolute inset-y-0 right-0 flex items-center w-8 h-8 pr-3 text-indigo-500 cursor-pointer top-2"
          aria-hidden="true"
          onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}
        />
      </div>
    </div>
  )
}

export default StatusModal
