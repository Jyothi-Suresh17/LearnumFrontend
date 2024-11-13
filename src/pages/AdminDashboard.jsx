import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/LearnUmlogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBarsStaggered,
  faTrashCan,
  faUsers,
  faTimes,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  addCourseApi,
  allCoursesApi,
  allUserApi,
  deleteCourseApi,
  deleteUserApi,
} from "../services/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditCourse from "../components/EditCourse";
import { editResponseContext } from "../context/DataShare";

function AdminDashboard({ courses }) {

  const [show, setShow] = useState(false);
  const fileInputRef = useRef(null);
  const [key, setKey] = useState(0);
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    thumbnail: "",
    videolink: "",
    content: "",
    duration: "",
    description: "",
  });
  const [allCourses, setAllCourses] = useState([]);
  const [token, setToken] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [deleteCourseStatus, setDeleteCourseStatus] = useState(false);
  const [deleteUserStatus, setDeleteUserStatus] = useState(false);

  //for context
  const {editResponse}=useContext(editResponseContext)
 

  const handleShow = () => setShow(true);

  const handleFile = (e) => {
    setCourseDetails({ ...courseDetails, thumbnail: e.target.files[0] });
  };

  const getUserDetails = async () => {
    const reqHeader = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await allUserApi(reqHeader);
      setUsers(result.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleClose1 = () => {
    setCourseDetails({
      title: "",
      thumbnail: "",
      videolink: "",
      duration: "",
      description: "",
      content: "",
    });
    setThumbUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShow(false);

    if (key == 0) {
      setKey(1);
    } else {
      setKey(0);
    }
  };

  const validateLink = (e) => {
    const link = e.target.value;
    let embedLink = "";

    if (link.includes("v=")) {
      const yTkey = link.split("v=")[1].substring(0, 11);
      embedLink = `https://www.youtube.com/embed/${yTkey}`;
    } else if (link.startsWith("https://youtu.be")) {
      const yTkey = link.slice(17, 28);
      embedLink = `https://www.youtube.com/embed/${yTkey}`;
    } else if (link.includes("embed/")) {
      embedLink = link;
    } else {
      const yTkey = link.slice(-11);
      embedLink = `https://www.youtube.com/embed/${yTkey}`;
    }

    setCourseDetails({ ...courseDetails, videolink: embedLink });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { title, thumbnail, videolink, duration, description, content } =
      courseDetails;

    if (!title || !thumbnail || !videolink || !duration || !description) {
      toast.error("Please fill in all fields before adding a course.");
      return;
    } else {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("thumbnail", thumbnail);
      reqBody.append("videolink", videolink);
      reqBody.append("duration", duration);
      reqBody.append("description", description);
      reqBody.append("content", content);

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await addCourseApi(reqBody, reqHeader);
        console.log("Course added:", result.data);
        
        await getAllCourses();
        handleClose1();
        toast.success("Course added successfully!");
      } catch (error) {
        console.error("Failed to add course:", error);
        toast.error("Failed to add course.");
      }
    }
  };

  const getAllCourses = async () => {
    try {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await allCoursesApi("", reqHeader); // Pass "" for no search term
      console.log("Fetched courses:", response.data); // Log the fetched data
      setAllCourses(response.data); // Update the state with fetched courses
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const result = await deleteCourseApi(courseId);
    // console.log(result);

    if (result.status == 200) {
      setDeleteCourseStatus(true);
    }
  };

  const handleDeleteUser = async (userId) => {
    const result = await deleteUserApi(userId);

    if (result.status == 200) {
      setDeleteCourseStatus(true);
    }
  };

 
  useEffect(() => {
    if (courseDetails.thumbnail) {
      setThumbUrl(URL.createObjectURL(courseDetails.thumbnail));
    }
    getUserDetails();
    getAllCourses();
    setDeleteCourseStatus(false);
  }, [courseDetails.thumbnail, token, deleteCourseStatus,editResponse]);

  return (
    <>
      <div className="text-center">
        <div className="flex justify-between bg-cyan-400 p-3">
          <div className="flex items-center">
            <Link to="/">
              <img
                src={logo}
                alt="LearnUm logo"
                className="h-10 rounded mx-2"
              />
            </Link>
            <button
              className="bg-green-900 py-2 px-3 text-white rounded-md hover:bg-green-800"
              onClick={handleShow}
            >
              Add Course
            </button>
          </div>
          <div>
            {/* <Link to="/" className="no-underline">
              <button className="border-2 border-black text-white me-2 py-2 px-3 rounded-md hover:bg-red-950 hover:text-white transition duration-300">
                <span className="hidden md:inline">Logout</span>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="inline md:ml-2"
                />
              </button>
            </Link> */}
          </div>
        </div>
      </div>

      {show && (
        <div className="fixed inset-x-0 top-1 flex justify-center bg-gray-800 bg-opacity-0 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center pb-3 border-b">
              <h2 className="text-xl font-semibold">Add New Course</h2>
              <button
                onClick={handleClose1}
                className="text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>
            <div className="mt-4">
              <div className="space-y-2">
                <input
                  value={courseDetails.title}
                  type="text"
                  id="title"
                  name="title"
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course title"
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  key={key}
                  id="thumbnail"
                  name="thumbnail"
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleFile}
                />
                <input
                  value={courseDetails.videolink}
                  type="text"
                  id="videolink"
                  name="videolink"
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter video link"
                  onChange={validateLink}
                />
                <input
                  value={courseDetails.duration}
                  type="text"
                  id="courseduration"
                  name="courseduration"
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course duration"
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      duration: e.target.value,
                    })
                  }
                />
                <input
                  value={courseDetails.content}
                  type="text"
                  id="coursecontent"
                  name="coursecontent"
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course contents"
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      content: e.target.value,
                    })
                  }
                />
                <textarea
                  value={courseDetails.description}
                  id="description"
                  name="description"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter course description"
                  onChange={(e) =>
                    setCourseDetails({
                      ...courseDetails,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleClose1}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Close
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save{" "}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="my-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">All Courses</h2>
            <div className="space-y-4">
              {allCourses.map((course) => (
                <div
                  key={course._id}
                  className="py-4 rounded-md bg-teal-50 flex justify-between items-center"
                >
                  <h3 className="text-2xl font-semibold cursor-pointer mx-3">
                    {course.title}
                  </h3>
                  <div>
                    <EditCourse course={course} />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-red-700 mx-3 cursor-pointer"
                      onClick={() => {
                        handleDeleteCourse(course._id);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            <div className="bg-zinc-50 p-4 rounded-md text-center mb-32">
              <h1 className="text-2xl text-green-950">Total Number of Users</h1>
              <h1 className="text-red-800 font-bold text-3xl">
                {users.length}
              </h1>
            </div>
            <h1 className="text-2xl font-bold mb-4 hover:rotate-1 transform transition duration-300">
              Users <FontAwesomeIcon icon={faUsers} className="ml-2" />
            </h1>
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user._id} className="py-3 rounded-md bg-amber-50">
                  <h3 className="text-2xl font-semibold mx-3 flex justify-between">
                    {user.username}{" "}
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-red-700 mx-3 cursor-pointer"
                      onClick={() => {
                        handleDeleteUser(user._id);
                      }}
                    />
                  </h3>{" "}
                  {/* Only show username */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}

export default AdminDashboard;
