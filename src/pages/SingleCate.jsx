import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageResize from "quill-image-resize-module-react";
import Swal from "sweetalert2";
Quill.register("modules/imageResize", ImageResize);
function SingleCate() {
  const url = "https://students.trungthanhweb.com/api/";
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1700,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [addCourse, setAddcourse] = useState(false);
  const [courses, setCourse] = useState([]);
  const { id } = useParams();
  const [moduleList, setModuleList] = useState([{ module: "", detail: "" }]);
  const addTitleModule = (e, index) => {
    const list = [...moduleList];
    list[index].module = e;
    setModuleList(list);
  };
  const [courseName, setCourseName] = useState("");
  const [courseSummary, setcourseSummary] = useState("");
  const addContentModule = (value, index) => {
    const list = [...moduleList];
    list[index].detail = value;
    setModuleList(list);
  };
  const handleServiceAdd = () => {
    setModuleList([...moduleList, { module: "", detail: "" }]);
  };
  const submitCourse = () => {
    const detail = JSON.stringify(moduleList);
    if (courseName == "" || courseSummary == "" || detail == "") {
      Toast.fire({
        icon: "error",
        title: "Thiếu thông tin khóa học",
      });
    } else {
      axios({
        method: "post",
        url: url + "course",
        data: {
          name: courseName,
          detail: detail,
          summary: courseSummary,
          idCate: id,
        },
      }).then(function (res) {
        if (res.data.check == true) {
          Toast.fire({
            icon: "success",
            title: "Thêm thành công",
          });
          setCourse(res.data.courses);
        } else {
        }
      });
    }
  };
  useEffect(() => {
    axios({
      method: "get",
      url: url + `course/${id}`,
      data: {
        idCate: id,
      },
    }).then(function (res) {
      setCourse(res.data);
      console.log(courses);
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="main">
        <nav className="navbar navbar-expand px-3 border-bottom">
          <button
            className="btn btn-primary"
            onClick={() => setAddcourse(true)}
          >
            Thêm
          </button>
          <button
            className="btn btn-warning ms-3"
            onClick={() => setAddcourse(false)}
          >
            Hủy
          </button>
        </nav>
        <main className="content px-3 py-2">
          <div className="container-fluid">
            {addCourse && (
              <div className="row mt-2  w-50">
                <div className="row">
                  <div className="col-md">
                    <label htmlFor="">Tên khóa học</label>
                    <input
                      type="text"
                      onChange={(e) => setCourseName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md">
                    <label htmlFor="">Tóm tắt</label>
                    <input
                      type="text"
                      onChange={(e) => setcourseSummary(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mt-2">
                  {moduleList.map((SingleModule, index) => (
                    <div key={index} className="row mb-5">
                      <div className="col-md">
                        <label htmlFor="">Tên Module</label>
                        <input
                          type="text"
                          onChange={(e) =>
                            addTitleModule(e.target.value, index)
                          }
                          className="form-control"
                        />
                      </div>
                      <label htmlFor="" className="mb-2 mt-3">
                        Nội dung
                      </label>
                      <ReactQuill
                        onChange={(value) => addContentModule(value, index)}
                        className="mb-5"
                        modules={{
                          toolbar: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ size: [] }],
                            [
                              "bold",
                              "italic",
                              "underline",
                              "strike",
                              "blockquote",
                            ],
                            [
                              { list: "ordered" },
                              { list: "bullet" },
                              { indent: "-1" },
                              { indent: "+1" },
                            ],
                            ["link", "image", "video"],
                            ["clean"],
                          ],
                          clipboard: {
                            // toggle to add extra line breaks when pasting HTML:
                            matchVisual: false,
                          },
                          imageResize: {
                            parchment: Quill.import("parchment"),
                            modules: ["Resize", "DisplaySize"],
                          },
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="row">
                  <div style={{ marginLeft: "-10px" }} className="col-md-6">
                    <button
                      className="btn btn-warning"
                      onClick={handleServiceAdd}
                    >
                      Thêm module
                    </button>
                    <button
                      className="btn btn-success ms-3"
                      onClick={submitCourse}
                    >
                      Thêm khóa học
                    </button>
                  </div>
                </div>
              </div>
            )}
            {!addCourse && courses.length > 0 && (
              <div className="container mt-3">
                {courses.map((item) => (
                  <div key={item.id} className="col-md-3">
                    <div className="card" style={{"width": "100%"}}>
                      <img src="https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/87fbc3cd2699e42cab7756c86fbae735.png" className="card-img-top img-fluid" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{item.coursename}</h5>
                        <p className="card-text">
                            {item.summary}
                        </p>
                        <a href={`/single/${item.id}`} className="btn btn-primary mt-3">
                          Xem thêm
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default SingleCate;
