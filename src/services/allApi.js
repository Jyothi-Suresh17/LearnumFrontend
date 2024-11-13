import {commonApi} from "./commonApi"
import { serverUrl } from "./serverUrl"


//register
export const registerApi = async(reqBody)=>{

  await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

//login

export const loginApi =async(reqBody)=>{

 return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
 
}

//add course
export const addCourseApi = async (reqBody,reqHeader) => {
  return await commonApi('POST', `${serverUrl}/addCourse`, reqBody, reqHeader)
}

//homeCourses

export const homeCoursesApi = async()=>{
  return await commonApi('GET',`${serverUrl}/homeCourses`,"","")
}

//all courses

export const allCoursesApi = async (searchKey = "", reqHeader) => {
  try {
    const response = await commonApi(
      'GET', 
      `${serverUrl}/allCourses?search=${searchKey}`, 
      "", 
      reqHeader
    );
    // If needed, check the response format here.
    console.log('Response from allCoursesApi:', response);
    return response;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error; // Propagate the error for further handling
  }
};


//all users
export const allUserApi = async(reqHeader)=>{
  return await commonApi('GET',`${serverUrl}/allUsers`,"",reqHeader)
};

//delete course

export const deleteCourseApi = async(courseId)=>{

  return await commonApi('DELETE',`${serverUrl}/deleteCourse/${courseId}`,{},"")
  
}

//delete user
export const deleteUserApi = async(userId)=>{
  return await commonApi('DELETE',`${serverUrl}/deleteUser/${userId}`,{},"")
  }

  //to edit course details

  export const editCourseApi = async(courseId,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/editCourse/${courseId}`,reqBody,reqHeader)
  }