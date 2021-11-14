import { deleteComment } from '@context/store/actions/commentAction'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon, DuplicateIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, auth, comment }))
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const MenuItem = () => {
    return (
      <div>
        <Menu.Item>
          {({ active }) => (
            <span
              className={classNames(
                active ? 'bg-gray-100' : '',
                'hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex z-50  '
              )}
              onClick={() => setOnEdit(true)}
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
              onClick={handleRemove}
            >
              {' '}
              <TrashIcon className="w-6 h-6 mr-2 " />
              Delete Post
            </span>
          )}
        </Menu.Item>
      </div>
    )
  }
  return (
    <div className="mr-2 opacity-0 hover:opacity-100">
      {(post.user._id === auth.user._id || comment.user._id === auth.user._id) && (
        <Menu as="div" className="relative flex-shrink-0 ml-4">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="flex text-sm bg-white rounded-full ">
                  <span className="sr-only">Open Edit menu</span>
                  <DotsVerticalIcon className="w-6 h-6" />
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
                  {post.user._id === auth.user._id ? (
                    comment.user._id === auth.user._id ? (
                      MenuItem()
                    ) : (
                      <div>
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 flex'
                              )}
                              onClick={handleRemove}
                            >
                              {' '}
                              <TrashIcon className="w-6 h-6 mr-2" />
                              Remove Post
                            </span>
                          )}
                        </Menu.Item>
                      </div>
                    )
                  ) : (
                    comment.user._id === auth.user._id && MenuItem()
                  )}
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      )}
    </div>
  )
}

export default CommentMenu
