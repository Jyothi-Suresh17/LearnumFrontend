import React, { useState } from 'react';
import { serverUrl } from '../services/serverUrl';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CourseCard({ courses, showPlayButton = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Ensure autoplay is added to the video URL
  const videoUrl = `${courses.videolink}?autoplay=1`;

  return (
    <div className="max-w-[16rem] h-[30rem] rounded-lg overflow-hidden shadow-sm bg-green-100 flex flex-col">
      {/* Thumbnail */}
      <div className="h-[15rem]">
        <img
          className="w-full h-full object-cover cursor-pointer"
          src={`${serverUrl}/uploads/${courses.thumbnail}`}
          alt="Course Thumbnail"
        />
      </div>
      {/* Course Info */}
      <div className="px-3 py-2 flex-grow">
        <div className="font-bold text-base mb-1 text-pink-950">{courses.title}</div>
        <p className="text-gray-700 text-xs mb-2">
          {courses.description}
        </p>
        <div className="flex justify-between">
          <div className="text-gray-900 font-semibold text-xs">Contents: {courses.content}</div>
        </div>
        <div className="flex justify-between mt-1">
          <div className="text-gray-900 font-semibold text-xs">Duration: {courses.duration}</div>
          {showPlayButton && (
            <button className="btn hover:bg-emerald-300" onClick={openModal}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-1/2">
            <div className="relative">
              <button
                className="absolute top-2 right-2 text-white text-xl"
                onClick={closeModal}
              >
                X
              </button>
              {/* Embed the video with autoplay */}
              <iframe
                className="w-full h-64 md:h-96"
                src={videoUrl}  // Updated to include autoplay=1
                title={courses.title}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseCard;
