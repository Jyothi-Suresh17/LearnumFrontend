import React from "react";

function About() {
  return (
   <>
    <div className="grid grid-cols-4 sm:grid-cols-1 gap-4 mt-28 mb-9">
      <div className="col-span-4 sm:order-1 text-center">
        <h1 className="text-3xl font-bold text-teal-700 hover:rotate-3 transform transition duration-300">
          LearnUm
        </h1>
        <span className="block text-teal-600 transition duration-300">
          Your Free Learning Partner 
        </span>
        <p className="my-6 mx-14">
          Welcome to LearnUm, your go-to platform for mastering new skills and advancing your career. Our mission is to provide accessible, high-quality education that empowers learners worldwide. Whether you're a beginner looking to explore new subjects or a professional seeking to enhance your expertise, our diverse range of courses, taught by industry experts, ensures that you have the tools you need to succeed. Join our vibrant community and start your learning journey today!
        </p>
      </div>
      <div className="col-span-4 sm:order-2 text-center md:flex sm:hidden justify-center">

       <div className="img-div-home hidden md:block max-w-xs mx-auto">
       <img
          src="https://www.moople.in/blog/wp-content/uploads/2021/05/h1-1.jpg"
          alt="no-image"
          className="w-full max-w-xs mx-auto  transform transition duration-500 hover:scale-105 "
        />

        <h3 className=" mt-20 text-2xl font-bold hover:text-green-900">User Friendly</h3>
       </div>
       <div className="img-div-home hidden md:block max-w-xs mx-auto">
       <img
          src="https://i.pinimg.com/originals/13/98/2d/13982df1a443e057dd3a1d23404938be.jpg"
          alt="no-image"
          className="w-full max-w-xs mx-auto transform transition duration-500 hover:scale-105 mt-10 "
        />
        <h3 className=" mt-16 text-2xl font-bold  hover:text-red-900">Expert Instructors</h3>
       </div>
       <div className="img-div-home hidden md:block max-w-xs mx-auto">
       <img
          src="https://www.21kschool.com/jp/wp-content/uploads/sites/8/2022/09/5-Benefits-of-Personalized-Learning.png"
          alt="no-image"
          className="w-full max-w-xs mx-auto transform transition duration-500 hover:scale-105 mt-16 "
        />
        <h3 className=" mt-20 text-2xl font-bold hover:text-blue-900">Personalized Learning</h3>
       </div>
        
      </div>
      
    </div>
    <hr />
   </>
  );
}

export default About;
