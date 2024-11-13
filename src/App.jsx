import "./index.css";

import HomePage from "./pages/HomePage";
import Authentic from "./pages/Authentic";
import AllCources from "./pages/AllCources";
import AdminDashboard from "./pages/AdminDashboard";
import PageNotFound from './pages/PageNotFound'
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Authentic />} />
        <Route path="/register" element={<Authentic register />} />
        <Route path="/allCourses" element={<AllCources />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
       
        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;
