import { GLOBALTYPES } from '@context/store/actions/globalTypes'
import { updateProfileUser } from '@context/store/actions/profileAction'
import { checkImage } from '@utils/imageUpload'
import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EditProfile = ({ setOnEdit, onEdit }) => {
  const [userData, setUserData] = useState({
    fullname: '',
    mobile: '',
    address: '',
    website: '',
    story: '',
    gender: '',
  })
  const { fullname, mobile, address, website, story, gender } = userData
  const dispatch = useDispatch()

  const [avatar, setAvatar] = useState('')
  const { auth } = useSelector((state) => state)

  const changeAvatar = (e) => {
    const file = e.target.files[0]

    const err = checkImage(file)
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      })

    setAvatar(file)
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProfileUser({ userData, avatar, auth }))
  }

  useEffect(() => {
    setUserData(auth.user)
  }, [])

  return (
    <main className="fixed top-0 left-0 z-50 w-full h-full overflow-auto bg-indigo-100 bg-opacity-80 pt-60 ">
      <div className="max-w-screen-xl px-4 pb-6 mx-auto sm:px-6 lg:pb-16 lg:px-8 ">
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="divide-y divide-gray-200 lg:grid lg:divide-y-0 lg:divide-x">
            <form className="divide-y divide-gray-200 lg:col-span-9" onSubmit={handleSubmit}>
              {/* Profile section */}
              <div className="px-4 py-6 sm:p-6 lg:pb-8">
                <div>
                  <h2 className="text-lg font-medium leading-6 text-gray-900">Profile</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    This information will be displayed publicly so be careful what you share.
                  </p>
                </div>

                <div className="flex flex-col mt-6 lg:flex-row">
                  <div className="flex-grow space-y-6">
                    <div>
                      <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="flex mt-1 rounded-md shadow-sm">
                        <input
                          type="text"
                          name="fullname"
                          id="fullname"
                          autoComplete="fullname"
                          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          // defaultValue={user.handle}
                          value={fullname}
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="story" className="block text-sm font-medium text-gray-700">
                        Story
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="story"
                          name="story"
                          rows={3}
                          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          defaultValue={''}
                          onChange={handleInput}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your profile. URLs are hyperlinked.
                      </p>
                    </div>
                  </div>

                  <div className="flex-grow mt-6 lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                    <p className="text-sm font-medium text-gray-700" aria-hidden="true">
                      Photo
                    </p>
                    <div className="mt-1 lg:hidden">
                      <div className="flex items-center">
                        <div
                          className="flex-shrink-0 inline-block w-12 h-12 overflow-hidden rounded-full"
                          aria-hidden="true"
                        >
                          <img
                            className="w-full h-full rounded-full"
                            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                          />
                        </div>
                        <div className="ml-5 rounded-md shadow-sm">
                          <div className="relative flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md group hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <label
                              htmlFor="user_photo"
                              className="relative text-sm font-medium leading-4 text-gray-700 pointer-events-none"
                            >
                              <span>Change</span>
                              <span className="sr-only"> user photo</span>
                            </label>
                            <input
                              type="file"
                              name="file"
                              id="file_up"
                              accept="image/*"
                              className="absolute w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
                              onChange={changeAvatar}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative hidden overflow-hidden rounded-full lg:block">
                      <img
                        className="relative w-40 h-40 rounded-full"
                        src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                      />
                      <label
                        htmlFor="user-photo"
                        className="absolute inset-0 flex items-center justify-center w-full h-full text-sm font-medium text-white bg-black bg-opacity-75 opacity-0 hover:opacity-100 focus-within:opacity-100"
                      >
                        <span>Change</span>
                        <span className="sr-only"> user photo</span>
                        <input
                          type="file"
                          name="file"
                          id="file_up"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full border-gray-300 rounded-md opacity-0 cursor-pointer"
                          onChange={changeAvatar}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-6 mt-6">
                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                      Mobile
                    </label>
                    <input
                      type="number"
                      name="mobile"
                      id="mobile"
                      value={mobile}
                      onChange={handleInput}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value={website}
                      onChange={handleInput}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-12">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={address}
                      onChange={handleInput}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      value={gender}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={handleInput}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end px-4 py-4 mt-4 sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setOnEdit(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 ml-5 text-sm font-medium text-white bg-indigo-700 border border-transparent rounded-md shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default EditProfile
