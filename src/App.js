import { BrowserRouter, Route, Routes } from "react-router-dom";

import 'boxicons/css/boxicons.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
// import "bootstrap/dist/js/bootstrap.min.js";
import './css/style.css'
import Majors from "./pages/Majors";
import SingleCate from "./pages/SingleCate";
import CourseCates from "./pages/CourseCates";
import SingleCourse from "./pages/SingleCourse";
import EditCourse from "./pages/EditCourse";
function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Majors/>}/>
          <Route path="/cate/:id" element={<CourseCates/>}/>
          <Route path="/course/:id" element={<SingleCate/>}/>
          <Route path="/single/:id" element={<SingleCourse/>}/>
          <Route path="/edit/:id" element={<EditCourse/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
