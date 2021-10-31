const NotFound = () => {
  return (
    <div className="flex items-center w-screen bg-gray-100 h-100vh">
      <div className="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
        <div className="max-w-md">
          <div className="text-5xl font-bold font-dark">404</div>
          <p className="text-2xl font-light leading-normal md:text-3xl">Sorry we couldn't find this page. </p>
          <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>

          <button className="inline px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue active:bg-blue-600 hover:bg-blue-700">
            back to homepage
          </button>
        </div>
        <div className="max-w-lg"></div>
      </div>
    </div>
  )
}

export default NotFound
