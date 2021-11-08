import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { header_menu, header_menu_logged_in } from '@utils/config'
import Link from 'next/link'
import { logout } from '@context/store/actions/authAction'
import Avatar from '@components/avatar'
import Search from './search'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { auth } = useSelector((state) => state)
  const router = useRouter()
  const menu = auth.token ? header_menu_logged_in : header_menu
  const dispatch = useDispatch()

  return (
    <Disclosure as="nav" className="fixed top-0 z-40 w-full bg-white shadow ">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <div
                  className="flex items-center flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    router.push('/')
                  }}
                >
                  <img
                    className="block w-auto h-8 lg:hidden"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden w-auto h-8 lg:block"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden lg:ml-16 lg:flex lg:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {/* {menu.map((value, key) => {
                    return (
                      <Link href={value.url} key={key}>
                        <a
                          className={`${
                            router.pathname === value.url
                              ? '  border-indigo-500 text-gray-900'
                              : ' hover:border-gray-300 hover:text-gray-700 text-gray-500'
                          }   border-b-4 inline-flex items-center px-1 pt-1 text-sm font-medium  `}
                        >
                          <span className={`${router.pathname === value.url ? 'text-center' : 'span text-center'}`}>
                            {value.caption}
                          </span>
                        </a>
                      </Link>
                    )
                  })} */}
                  {menu.map((value, key) => {
                    return (
                      <Link href={value.url} key={key}>
                        <a
                          className={`${
                            router.pathname === value.url ? 'border-puertorico border-b-4' : 'border-transparent'
                          }    inline-flex items-center px-1  font-medium cursor-pointer group`}
                        >
                          <span
                            className={`${
                              router.pathname === value.url ? ' pt-1 border-puertorico' : 'span text-center'
                            }`}
                          >
                            {value.caption}
                          </span>
                        </a>
                      </Link>
                    )
                  })}
                </div>
              </div>
              <Search />
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <button className="flex-shrink-0 p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative flex-shrink-0 ml-4">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span className="sr-only">Open user menu</span>
                          {/* <img className="w-8 h-8 rounded-full" src={auth.user?.avatar} alt="" /> */}
                          <Avatar className="w-8 h-8 rounded-full" src={auth.user?.avatar} />
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
                          className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <Link href={`/profile/${auth.user._id}`}>
                                <a
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Your Profile
                                </a>
                              </Link>
                            )}
                          </Menu.Item>

                          <form>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="submit"
                                  className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block w-full text-left px-4 py-2 text-sm'
                                  )}
                                  onClick={() => dispatch(logout())}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </form>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}

              {menu.map((value, key) => {
                return (
                  <Link href={value.url} key={key}>
                    <a
                      className={`${
                        router.pathname === value.url ? 'text-indigo-700 border-l-4 border-indigo-500 bg-indigo-50' : ''
                      }    block py-2 pl-3 pr-4 text-base font-medium text-gray-600 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800`}
                    >
                      <span>{value.caption}</span>
                    </a>
                  </Link>
                )
              })}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  {/* <img className="w-10 h-10 rounded-full" src={auth.user?.avatar} alt="" />
                   */}
                  <Avatar src={auth.user?.avatar} className="w-10 h-10 rounded-full" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Tom Cook</div>
                  <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                </div>
                <button className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              <div className="w-full mt-3 space-y-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </a>
                <button
                  // type="submit"
                  className={classNames(
                    'block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                  )}
                  onClick={() => dispatch(logout())}
                >
                  Sign out
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
