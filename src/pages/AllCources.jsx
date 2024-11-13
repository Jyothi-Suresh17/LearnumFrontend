import {
  faMagnifyingGlass,
  faClockRotateLeft,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/LearnUmlogo.png";
import CourseCard from "../components/CourseCard";
import { allCoursesApi } from "../services/allApi";

function AllCources({ courses }) {
  const [allCourses, setAllCourses] = useState([]);
  const [token, setToken] = useState("");

  const [searchKey, setSearchKey] = useState("");
  


  // setHomeCourse(result.data);
  const getAllCourses = async () => {
    try {
      const reqHeader = {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      };
      const result = await allCoursesApi(searchKey,reqHeader);

      setAllCourses(result.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
    getAllCourses();
    
  }, [searchKey]);

  // console.log(allCourses);
  // console.log(searchKey);
  

  return (
    <>
      <div className="courses">
        <div className="coursenav flex justify-between bg-cyan-400">
          <div className="logo ms-2 my-3">
            <Link to="/">
              <img src={logo} alt="LearnUm logo" className="h-10 rounded" />
            </Link>
          </div>

          <div className="my-3 me-3">
            <div className="flex w-52">
              <input
                type="text"
                placeholder="Search Contents"
                className="form-control"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ marginTop: "12px", marginLeft: "-30px" }}
                className="text-secondary"
              />
            </div>
          </div>

          
        </div>

        <h1 className="text-3xl font-bold text-teal-700 my-12 text-center hover:rotate-3 transform transition duration-300">
          Courses Offered
        </h1>
      </div>

      {token ? (
        <div className="grid grid-cols-1 courseDisplay sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 mx-auto items-center justify-items-center mb-28">
          {allCourses.length > 0 ? (
            allCourses.map((course) => (
              <div key={course._id}>
                <CourseCard courses={course} showPlayButton={true} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">No courses found</p>
          )}
        </div>
      ) : (
        <div className="noLogin flex flex-col items-center justify-center min-h-screen space-y-4">
          <img
            src="https://i.pinimg.com/originals/ab/05/94/ab059423d9884639658baf6764ceb970.gif"
            alt="no image"
          />
          <h4 className="text-sky-800 flex items-center hover:scale-110 transition-transform duration-200">
            <Link to={"/login"}>
              Please Login for Courses{" "}
              <FontAwesomeIcon icon={faLocationArrow} className="ml-2" />
            </Link>
          </h4>
        </div>
      )}
    </>
  );
}

export default AllCources;
