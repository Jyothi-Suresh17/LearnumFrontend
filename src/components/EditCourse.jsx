import { faPenToSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editCourseApi } from '../services/allApi';
import { editResponseContext } from '../context/DataShare';

function EditCourse({ course }) {
  const [show, setShow] = useState(false);
  const fileInputRef = useRef(null);

  const [courseData, setCourseData] = useState({
    title: course.title || '',
    thumbnail: course.thumbnail || null,
    videolink: course.videolink || '',
    duration: course.duration || '',
    content: course.content || '',
    description: course.description || '',
  });

  const [thumbUrl, setThumbUrl] = useState("");
  const [key,setKey] = useState(0);
  
  const {setEditResponse} = useContext(editResponseContext)
  const handleClose = () => {
    
    setCourseData({
      title: course.title || '',
      thumbnail: course.thumbnail || null,
      videolink: course.videolink || '',
      duration: course.duration || '',
      content: course.content || '',
      description: course.description || '',
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShow(false);
    setThumbUrl("");

    if(key==0){
      setKey(1)
    }
    else{
      setKey(0)
    }

  };

  const handleShow = () => {
    setCourseData({
      title: course.title || '',
      thumbnail: course.thumbnail || null,
      videolink: course.videolink || '',
      duration: course.duration || '',
      content: course.content || '',
      description: course.description || '',
    });
    setShow(true);
  };

  //validate link

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
  
    setCourseData({ ...courseData, videolink: embedLink });
  };
//update data
  const handleEdit = async(e) => {
    e.preventDefault();

    // console.log("Course data saved:", courseData);
    const { title, videolink, duration, description, content } = courseData;
    
    if (!title ||  !videolink || !duration || !description) {
      // toast.error("Please fill in all fields before adding a course.");
      return;
    }
    else{
      const reqBody = new FormData();
      reqBody.append("title", title);
      thumbUrl?reqBody.append("thumbnail", thumbnail):reqBody.append("thumbnail",course.thumbnail);
      reqBody.append("videolink", videolink);
      reqBody.append("duration", duration);
      reqBody.append("description", description);
      reqBody.append("content", content);

      const token = sessionStorage.getItem("token");
      console.log(token);

      if(thumbUrl){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        const result = await editCourseApi(course._id,reqBody,reqHeader) ;
        console.log(result);
        if(result.status === 200){
         
          setEditResponse(result.data)
          handleClose();
          //  toast.success("Course updated successfully"); 
        }
        else{
          // toast.error("Failed to update course");


        }
        
      }
      else{
        const reqHeader = {

          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`

        }

        const result = await editCourseApi(course._id,reqBody,reqHeader) ;
        console.log(result);
        if(result.status === 200){
          alert("Course updated successfully");
          setEditResponse(result.data);
          handleClose()
        }
        else{
          // toast.error("Failed to update course");
        }
      }
      
      






    }

    handleClose();
  };

  
  

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData({ ...courseData, thumbnail: file });
    }
  };

  useEffect(() => {
    if (courseData.thumbnail instanceof File) {
      const objectUrl = URL.createObjectURL(courseData.thumbnail);
      setThumbUrl(objectUrl);

      // Cleanup the object URL after use
      return () => URL.revokeObjectURL(objectUrl);
    }
    
  }, [courseData.thumbnail]);

  return (
    <>
      <FontAwesomeIcon icon={faPenToSquare} onClick={handleShow} />

      {show && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center pb-3 border-b">
              <h2 className="text-xl font-semibold">Edit Course</h2>
              <button onClick={handleClose} className="text-red-500 hover:text-red-700">
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <input
                value={courseData.title}
                onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                type="text"
                id="title"
                name="title"
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course title"
              />
              <input
                type="file"
                ref={fileInputRef}
                id="thumbnail"
                name="thumbnail"
                key={key}
                onChange={(e) => handleFileUpload(e)}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {thumbUrl && <img src={thumbUrl} alt="Thumbnail preview" className="w-32 h-32 mt-2" />}
              <input
                value={courseData.videolink}
                onChange={validateLink}
                type="text"
                id="videolink"
                name="videolink"
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter video link"
              />
              <input
                value={courseData.duration}
                onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                type="text"
                id="courseduration"
                name="courseduration"
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course duration"
              />
              <input
                value={courseData.content}
                onChange={(e) => setCourseData({ ...courseData, content: e.target.value })}
                type="text"
                id="coursecontent"
                name="coursecontent"
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course contents"
              />
              <textarea
                value={courseData.description}
                onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                id="description"
                name="description"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course description"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={handleClose} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Cancel
              </button>
              <button onClick={handleEdit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> */}
    </>
  );
}

export default EditCourse;
