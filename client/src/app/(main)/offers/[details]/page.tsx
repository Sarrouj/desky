import React from 'react'

const page = ({ params } : { params : any}) => {
  return (
    <div>offer { params.details}</div>
  )
}

export default page