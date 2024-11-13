import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
function PageNotFound() {
  return (
    <>
   <div className="flex justify-center notfpund">
  <div className="w-full md:w-10/12 text-center mt-5 flex items-center justify-center text-2xl">
    {/* <a href="/" className="no-underline text-white">
      
    </a> */}

    <Link to='/' className='no-underline text-white '>Back to home <FontAwesomeIcon icon={faHouseUser} /></Link>
  </div>
</div>

    </>
  )
}

export default PageNotFound