import React from 'react'

function Footer() {
  return (
<>

<footer className="bg-cyan-400  py-8">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap justify-between">
      <div className="w-full md:w-1/3 mb-6">
        <h2 className="text-2xl font-bold mb-2">LearnUm</h2>
        <p>Your go-to platform for mastering new skills and advancing your career. Join our vibrant community and start your learning journey today!</p>
      </div>

      <div className="w-full md:w-1/3 mb-6">
        <h3 className="font-bold text-lg mb-2">Quick Links</h3>
        <ul>
          <li className="mb-2"><a href="#" className="hover:text-gray-600">About</a></li>
          <li className="mb-2"><a href="#" className="hover:text-gray-600">Courses</a></li>
          <li className="mb-2"><a href="#" className="hover:text-gray-600">Contact</a></li>
        </ul>
      </div>

      <div className="w-full md:w-1/3 mb-6">
        <h3 className="font-bold text-lg mb-2">Contact Us</h3>
        <p>Email: <a href="mailto:info@learnum.com" className="hover:text-gray-700">info@learnum.com</a></p>
        <p>Phone: <a href="tel:+1234567890" className="hover:text-gray-600">+1 234 567 890</a></p>
        <p>Address: 123 Learning St, Education City, TE</p>
      </div>
    </div>

    <div className="mt-8 text-center border-t border-gray-500 pt-4">
      <p>&copy; 2024 LearnUm. All rights reserved.</p>
    </div>
  </div>
</footer>




</> 
 )
}

export default Footer