import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMajors } from "../redux/MajorSlice";
function CourseCates() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [addEduType, setAddEduType] = useState(false);
  const { majors, loading } = useSelector((state) => state.majors);
  const [idMajor, setidMajor] = useState(0);
  const [eduType, seteduType] = useState("");
  const [idMajor1, setidMajor1] = useState(0);
  const [eduType1, seteduType1] = useState("");
  const [editEduType, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [data, setData] = useState([]);
  const url = "http://127.0.0.1:8000/api/";
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
  const setEditType = (id, old) => {
    seteduType1(old);
    setIdEdit(id);
    setEdit(true);
    setAddEduType(false);
  };
  const deleteCourseCate = (id) => {
    Swal.fire({
        icon:'question',
      text: "Bạn muốn xóa hình thức?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Đúng",
      denyButtonText: `Không`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios({
            method: "post",
            url: url + "deleteCourseCate",
            data: {
              id: id,
            },
          }).then(function (res) {
            if (res.data.check == true) {
                Toast.fire({
                  icon: "success",
                  title: "Đã xóa thành công",
                });
                setData(res.data.courseCates);
              }
          })
      } else if (result.isDenied) {
      }
    });
  };
  const submitEditEduType = () => {
        axios({
            method: "post",
            url: url + "updateCourseCate",
            data: {
              id: idEdit,
              idMajor: id,
              courseCate: eduType1,
            },
          }).then(function (res) {
            if (res.data.check == true) {
              Toast.fire({
                icon: "success",
                title: "Đã sửa thành công",
              });
              seteduType("");
              setData(res.data.courseCates);
              setAddEduType(false);
              setEdit(false);
              setidMajor(0);
            }else{
                if(res.data.msg.id){
                    Toast.fire({
                        icon: "error",
                        title: res.data.msg.id,
                      });
                }else if(res.data.msg.idMajor){
                    Toast.fire({
                        icon: "error",
                        title: res.data.msg.idMajor,
                      });
                }else if(res.data.msg.courseCate){
                    Toast.fire({
                        icon: "error",
                        title: res.data.msg.courseCate,
                      });
                }
            }
          });
  };
  const submitEduType = () => {
    if (eduType != "") {
      axios({
        method: "post",
        url: url + "courseCate",
        data: {
          idMajor: id,
          courseCate: eduType,
        },
      }).then(function (res) {
        if (res.data.check == true) {
          Toast.fire({
            icon: "success",
            title: "Đã thêm thành công",
          });
          seteduType("");
          setData(res.data.courseCates);
          setAddEduType(false);
          setidMajor(0);
        }
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Thiếu thông tin loại hình giáo dục",
      });
    }
  };
  useEffect(() => {
    axios({
      method: "get",
      url: url + "courseCate/"+id,
    }).then(function (res) {
      setData(res.data);
    });
    dispatch(getMajors());
  }, []);
  return (
    <>
      <Navbar />
      <div className="main">
        <nav className="navbar navbar-expand px-3 border-bottom">
          <button
            className="btn btn-primary"
            onClick={() => {
              setAddEduType(true);
              setEdit(false);
            }}
          >
            Thêm
          </button>
          <button
            className="btn btn-warning ms-3"
            onClick={(e) => setAddEduType(false)}
          >
            Hủy
          </button>
        </nav>
        <main className="content px-3 py-2">
          <div className="container-fluid">
            {addEduType && (
              <div className="row">
                <div className="col-md">
                  <div className="row w-100">
                    <div className="col-md-3">
                      <input
                        type="text"
                        placeholder="Loại hình giáo dục"
                        onChange={(e) => seteduType(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md">
                      {!editEduType && (
                        <button
                          className="btn btn-primary"
                          onClick={submitEduType}
                        >
                          Thêm
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {editEduType && (
              <div className="row">
                <div className="col-md">
                  <div className="row w-100">
                    <div className="col-md-3">
                      <input
                        type="text"
                        placeholder="Loại hình giáo dục"
                        onChange={(e) => seteduType1(e.target.value)}
                        className="form-control"
                        value={eduType1}
                      />
                    </div>
                    <div className="col-md">
                      <button
                        className="btn btn-warning"
                        onClick={submitEditEduType}
                      >
                        Sửa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {data && data.length > 0 && (
              <div className="row mt-2">
                <div className="table-responsive">
                  <table className="table table-primary">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Loại hình</th>
                        <th scope="col">Chuyên môn</th>
                        <th scope="col">Ngày tạo</th>
                        <th scope="col">Tùy chỉnh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index} className="">
                          <td>{++index}</td>
                          <td><a href={`/course/${item.id}`}>{item.name}</a></td>
                          <td>{item.major}</td>
                          <td>{item.created_at}</td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={(e) => setEditType(item.id, item.name)}
                            >
                              Sửa
                            </button>
                            <button
                              className="btn btn-danger ms-3"
                              onClick={(e) => deleteCourseCate(item.id)}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default CourseCates;
