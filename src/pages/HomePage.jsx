import React, { useEffect } from 'react'
import Header from '../components/Header'
import About from '../components/About'
import CourseSnap from '../components/CourseSnap'
import Footer from '../components/Footer'
function HomePage() {

 

  return (

   

   <>
  <div>
    {/*  className='bg-green-50' */}
  <Header/>
   <About/>
   <CourseSnap/>
   <Footer/>
  </div>
   </>
  )
}

export default HomePage