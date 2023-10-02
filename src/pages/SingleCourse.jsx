import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import"../css/style2.css";
import { useParams } from "react-router-dom";
function SingleCourse() {
    const url = "http://127.0.0.1:8000/api/";
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
    useEffect(()=>{
        axios({
            method: "get",
            url: url + `singlecourse/${id}`,
          }).then(function (res) {
            setData(res.data[0]);
            const modules = JSON.parse(res.data[0].detail);
            setModule(modules);
          });
    },[])
    return (
    <>
        <Navbar />
      <div className="main">
        {/* <nav className="navbar navbar-expand px-3 border-bottom"></nav> */}
        <div className="container mt-5">
            <h4 className='title text-danger'>Tên khóa học : {data.name}</h4>
            <h4 className='title'>Chương trình học : {data.majorname}</h4>
            <h4 className='title'>Nội dung tóm tắt : {data.summary}</h4>
            <div className="row mt-5">
              {module && module.length>0 && module.map((item,index)=>(
                <div key={index} className="col-md">
                    <h4>{item.module}</h4>
                    <div
                      dangerouslySetInnerHTML={{__html: item.detail}}

                    />
                </div>
              ))}
            </div>
        </div>
    </div>   
    </>
  )
}

export default SingleCourse