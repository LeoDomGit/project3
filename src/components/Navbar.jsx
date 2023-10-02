import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMajors } from "../redux/MajorSlice";
function Navbar() {
  const dispatch = useDispatch();
  const { majors, loading } = useSelector((state) => state.majors);
  useEffect(() => {
    dispatch(getMajors());
  }, []);
  return (
    <aside id="sidebar">
      <div className="h-100">
        <div className="sidebar-logo">
          <Link to={"/"}>Dashboard</Link>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link
              to={"/"}
              className="sidebar-link collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#pages"
              aria-expanded="false"
              aria-controls="pages"
            >
              <i className="bx bx-book"></i>
              Chương trình học
            </Link>
            <ul
              id="pages"
              className="sidebar-dropdown list-unstyled collapse"
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item">
                <a href={"/"} className="sidebar-link">
                  Nhóm môn học
                </a>
              </li>
              {majors.map((item, index) => (
                <li key={index} className="sidebar-item">
                  <a href={`/cate/${item.id}`} className="sidebar-link">
                   {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          {/* <li className="sidebar-item">
            <Link to={"#"} className="sidebar-link">
              <i className="bx bx-book"></i>
              Nhóm ngành học
            </Link>
          </li> */}
        </ul>
      </div>
    </aside>
  );
}

export default Navbar;
