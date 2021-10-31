import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import { GLOBALTYPES } from '@context/store/actions/globalTypes'

const Toast = ({ msg, handleShow }) => {
  const textColor = msg.title === 'Success' ? 'text-green-400' : 'Error' && 'text-red-400'
  const borderColor = msg.title === 'Success' ? 'border-green-400' : 'Error' && 'border-red-400'

  const [show, setShow] = useState(true)

  const dispatch = useDispatch()

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`${textColor} ${borderColor} w-full max-w-sm overflow-hidden  border-2  rounded-lg shadow-lg pointer-events-auto 2xl:mt-16 2xl:mr-36 ring-1 ring-black ring-opacity-5`}
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className={`${textColor} h-6 w-6`} aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className={`text-sm font-medium ${textColor}`}>{msg.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{msg.body}</p>
                  </div>
                  <div className="flex flex-shrink-0 ml-4">
                    <button
                      className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setShow(false)
                        dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
Toast.defaultProps = {
  size: 10,
  bgColor: 'green',
}

export default Toast
