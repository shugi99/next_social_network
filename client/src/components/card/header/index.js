import Avatar from '@components/avatar'
import React, { Fragment } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Transition } from '@headlessui/react'
import { DotsHorizontalIcon, DuplicateIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'
import { GLOBALTYPES } from '@context/store/actions/globalTypes'
import { deletePost } from '@context/store/actions/postAction'
import { useRouter } from 'next/router'
import { BASE_URL } from '@utils/config'

const CardHeader = ({ post }) => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } })
  }

  const handleDeletePost = () => {
    if (window.confirm('Delete this post')) {
      dispatch(deletePost({ post, auth }))
      router.push('/')
    }
  }
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div className="flex p-4 space-x-4 ">
      <Link href={`/profile/${post.user._id}`}>
        <a>
          <Avatar
            src={post.user.avatar}
            fullname={post.user.fullname}
            className="w-10 h-10 rounded-full cursor-pointer "
          />
        </a>
      </Link>
      <div className="flex flex-col">
        <Link href={`/profile/${post.user._id}`}>
          <a>{post.user.username}</a>
        </Link>
        <small className="">{moment(post.createdAt).fromNow()}</small>
      </div>
      <div className="absolute top-2 right-6">
        <Menu as="div" className="relative flex-shrink-0 ml-4">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="flex text-sm bg-white rounded-full ">
                  <span className="sr-only">Open Edit menu</span>
                  <DotsHorizontalIcon className="w-6 h-6" />
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg cursor-pointer ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  {auth.user._id === post.user._id && (
                    <div>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex z-50  '
                            )}
                            onClick={handleEditPost}
                          >
                            {' '}
                            <PencilIcon className="w-6 h-6 mr-2 " />
                            Edit Post
                          </span>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex '
                            )}
                            onClick={handleDeletePost}
                          >
                            {' '}
                            <TrashIcon className="w-6 h-6 mr-2 " />
                            Delete Post
                          </span>
                        )}
                      </Menu.Item>
                    </div>
                  )}

                  {/* <Menu.Item>
                    {({ active }) => (
                      <span
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex'
                        )}
                        onClick={handleCopyLink}
                      >
                        {' '}
                        <DuplicateIcon className="w-6 h-6 mr-2" />
                        Copy Link
                      </span>
                    )}
                  </Menu.Item> */}
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  )
}

export default CardHeader
