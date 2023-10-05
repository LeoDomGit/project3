import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Login from "./pages/Login";
import Education from "./pages/Education";
import CourseCates from "./pages/CourseCates";
import AddCourse from "./pages/AddCourse";
import SingleCourse from "./pages/SingleCourse";
import EditCourse from "./pages/EditCourse";
import Logout from "./pages/Logout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/users" element={<Home/>}/>
          <Route path="/edu" element={<Education/>}/>
          <Route path="/cate/:id" element={<CourseCates/>}/>
          <Route path="/course/:id" element={<AddCourse/>}/>
          <Route path="/single/:id" element={<SingleCourse/>}/>
          <Route path="/edit/:id" element={<EditCourse/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
