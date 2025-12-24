import React, { Suspense } from 'react'
// import ChildComponent from './ChildComponent'
const ChildComponent = React.lazy(() => import('./ChildComponent'))

function LazyLoading() {
  return (
    <>
    <h1 className='text-2xl bg-blue-200 text-center p-4' >LayLoading Component</h1>
    <Suspense fallback={<p>Loading...</p>} >
      <ChildComponent />
    </Suspense>
    </>
  )
}

export default LazyLoading