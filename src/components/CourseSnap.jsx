import React, { useEffect, useState } from 'react'
import CourseCard from "../components/CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeanpub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { homeCoursesApi } from '../services/allApi'

function CourseSnap() {
  const [homeCourse,setHomeCourse] = useState([])

  const gethomeCourses = async()=>{
    const result =await homeCoursesApi()
    setHomeCourse(result.data);
    
}
console.log(homeCourse);


useEffect(()=>{
  gethomeCourses()
},[])

  return (
    <>

      <div className="mb-12">
      <div className="div text-center mt-20">
        <div className="cousesHere">
          <h2 className="text-3xl  font-bold mb-10 text-teal-900 hover:rotate-3 transform transition duration-300 ">
          <FontAwesomeIcon icon={faLeanpub} className="me-2" />Our Courses
          </h2>
          {/* <p className="text-xl font-bold text-amber-900">These are the courses that we offer.............</p> */}
        </div>
      </div>
      
      <div class="snap-x snap-mandatory  overflow-x-auto flex space-x-20 p-4 justify-evenly items-center ">
        
        {homeCourse?.length>0?
        homeCourse.map((items)=>(<div className="snap-center flex-shrink-0">
          <CourseCard courses = {items} /> 
          {/* props to courseCard.jsx */}
        </div>))
        
        :
        
        null}
       
       
        <div className="snap-center flex-shrink-0 flex flex-col items-center justify-center relative h-60 w-60 bg-slate-900">
  <Link to='/allCourses'><button className="text-white absolute inset-x-0 bottom-28 text-center">See More Courses <FontAwesomeIcon icon={faArrowRightLong} className="ms-3" /></button></Link>
</div>

      </div>
      </div>

      <hr />
    </>
  );
}

export default CourseSnap;
