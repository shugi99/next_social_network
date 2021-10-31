import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '@context/store/actions/authAction'

export default function Login() {
  const router = useRouter()
  const { auth, alert } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.token) {
      router.push('/')
    }
  }, [auth.token])

  const [userData, setUserData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    cf_password: '',
    gender: 'male',
  })
  const { fullname, username, email, password, cf_password } = userData

  const [typePass, setTypePass] = useState(false)
  const [typeCfPass, setTypeCfPass] = useState(false)

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(register(userData))
  }
  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="w-auto h-12 mx-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Register now</h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Or{' '}
          <Link href="/login">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">Sign in to your account</a>
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="Full name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="h-16 mt-1 ">
                <input
                  id="fullname"
                  name="fullname"
                  type="fullname"
                  autoComplete="fullname"
                  value={fullname}
                  onChange={handleChangeInput}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <small className="text-red-300 ">{alert.fullname && alert.fullname}</small>
              </div>
            </div>
            <div>
              <label htmlFor="Username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="h-16 mt-1 ">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  value={username.toLowerCase().replace(/ /g, '')}
                  onChange={handleChangeInput}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <small className="text-red-300">{alert.username && alert.username}</small>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="h-16 mt-1 ">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  // autoComplete="email"
                  onChange={handleChangeInput}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <small className="text-red-300">{alert.email && alert.email}</small>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative h-16 mt-1 ">
                <input
                  id="password"
                  name="password"
                  type={typePass ? 'text' : 'password'}
                  value={password}
                  onChange={handleChangeInput}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <small
                  className="absolute top-0 right-0 p-2 cursor-pointer opacity-15"
                  onClick={() => setTypePass(!typePass)}
                >
                  {typePass ? 'Hide' : 'Show'}
                </small>
                <small className="text-red-300">{alert.password && alert.password}</small>
              </div>
            </div>

            <div>
              <label htmlFor="Confirm password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative h-16 mt-1 ">
                <input
                  id="cf_password"
                  name="cf_password"
                  type={typeCfPass ? 'text' : 'password'}
                  value={cf_password}
                  autoComplete="cf_password"
                  onChange={handleChangeInput}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <small
                  className="absolute top-0 right-0 p-2 cursor-pointer opacity-15"
                  onClick={() => setTypeCfPass(!typeCfPass)}
                >
                  {typeCfPass ? 'Hide' : 'Show'}
                </small>
                <small className="text-red-300">{alert.cf_password && alert.cf_password}</small>
              </div>
            </div>

            <div className="flex h-8">
              <label htmlFor="male" className="w-1/2">
                Male:{' '}
                <input type="radio" id="male" name="gender" value="male" defaultChecked onChange={handleChangeInput} />
              </label>

              <label htmlFor="female" className="w-1/2">
                Female: <input type="radio" id="female" name="gender" value="female" onChange={handleChangeInput} />
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
