import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageResize from "quill-image-resize-module-react";
import Swal from "sweetalert2";
Quill.register("modules/imageResize", ImageResize);
function EditCourse() {
    const url = "https://students.trungthanhweb.com/api/";
    const [data,setData]=useState({});
    const [module,setModule]= useState([]);
    const { id } = useParams();
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
    const deleteModule =  (i)=>{
        console.log(i);
    }
    useEffect(()=>{
        axios({
            method: "get",
            url: url + `single/${id}`,
          }).then(function (res) {
            setData(res.data[0]);
            const modules = JSON.parse(res.data[0].detail);
            setModule(modules);
          });
    },[])
    const editContentModule = (value, index) => {
        const list = [...module];
        list[index].detail = value;
        setModule(list);
      };
  return (
    <>
              <Navbar />
        <div className="main">
            <div className="container">
            <div className="row mt-5 w-50">
                <div className="row">
                    <div className="col-md">
                        <label htmlFor="">Tên khóa học</label>
                        <input className="form-control" value={data.name}></input> 
                    </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md">
                    <label htmlFor="">Tóm tắt</label>
                    <input
                      type="text"
                      value={data.summary}
                      className="form-control"
                    />
                  </div>
                  </div>
                  <div className="row mt-2">
                    {module.map((item,index)=>(
                        <div key={index} className="row mb-5">
                      <div className="col-md">
                        <label htmlFor="">Tên Module</label>
                        <input
                          type="text"
                            value={item.module}
                          className="form-control"
                        /><button type="button" class="btn btn-danger btn-sm mt-2" onClick={(e)=>deleteModule(index)}>Xóa Module</button>
                      </div>
                      <label htmlFor="" className="mb-2 mt-3">
                        Nội dung
                      </label>
                      <ReactQuill
                       
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
                        value={item.detail}
                        onChange={(value) => editContentModule(value, index)}
                      />
                    </div>
                    ))}
                  </div>
            </div>
            <div className="row mb-3">
                  <div className="col-md">
                    <button
                      className="btn btn-warning"
                     
                    >
                    Sửa Thông tin
                    </button>
                
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditCourse