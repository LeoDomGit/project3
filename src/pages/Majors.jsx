import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
function Majors() {
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
  const [major, setMajor] = useState("");
  const [majors, setMajor1] = useState([]);
  const [addMJ, setAddMj] = useState(false);
  const [editMJ, seteditMJ] = useState(false);
  const [id, setIDEdit] = useState(0);
  const editMajor = (id, old) => {
    setMajor(old);
    seteditMJ(true);
    setIDEdit(id);
    setAddMj(true);
  };
  const deleteMajor = (id) => {
    Swal.fire({
        icon:'question',
      text: "Xóa chương trình giáo dục?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Đúng",
      denyButtonText: `Không`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios({
            method: "post",
            url: url + "deletemajors",
            data: {
              id: id,
             
            },
          }).then(function (res) {
            if(res.data.check==true){
                Toast.fire({
                    icon: "success",
                    title: "Đã xóa thành công",
                  });
              setMajor1(res.data.majors);

            }
          })
      } else if (result.isDenied) {
      }
    });
  };
  const submitEditMajor = () => {
    if (id != 0 && major != "") {
      Swal.fire({
        icon: "question",
        text: "Thay đổi thông thi chương trình học ?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Đúng",
        denyButtonText: `Không`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios({
            method: "post",
            url: url + "editmajors",
            data: {
              id: id,
              major: major,
            },
          }).then(function (res) {
            console.log(res);
            if (res.data.check == true) {
              Toast.fire({
                icon: "success",
                title: "Đã thay đổi thành công",
              });
              setAddMj(false);
              setMajor1(res.data.majors);
            }
          });
        } else if (result.isDenied) {
        }
      });
    }
  };
  const submitMajor = () => {
    console.log(major);
    if (major === "") {
      Toast.fire({
        icon: "error",
        title: "Thiếu tên chuyên môn",
      });
    } else {
      axios({
        method: "post",
        url: url + "majors",
        data: {
          major: major,
        },
      }).then(function (res) {
        if (res.data.check == true) {
          Toast.fire({
            icon: "success",
            title: "Thêm chuyên môn thành công",
          });
          setMajor("");
          setAddMj(false);  
          setMajor1(res.data.majors);
        } else {
          if (res.msg.major) {
            Toast.fire({
              icon: "error",
              title: res.msg.major,
            });
            setAddMj(false);
            seteditMJ(false);
          }
        }
      });
    }
  };
  const switchMajor = (id)=>{
    axios({
        method: "post",
        url: url + "switchmajors",
        data: {
          id: id,
        },
      }).then(function (res) {
        if (res.data.check == true) {
          Toast.fire({
            icon: "success",
            title: "Chuyển thành công",
          });
          setMajor1(res.data.majors);
        } else {
          if (res.msg.id) {
            Toast.fire({
              icon: "error",
              title: res.msg.id,
            });
          }
        }
      });
  }
  useEffect(() => {
    axios({
      method: "get",
      url: url + "majors",
    }).then(function (res) {
      setMajor1(res.data);
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="main">
        <nav className="navbar navbar-expand px-3 border-bottom">
          <button
            className="btn btn-primary"
            onClick={() => {
              setAddMj(true);
            }}
          >
            Thêm
          </button>
        </nav>
        <main className="content px-3 py-2">
          <div className="container-fluid">
            <div className="mb-5">
              {addMJ && (
                <div className="row w-50">
                  <div className="col-md-8">
                    <input
                      type="text"
                      value={major}
                      placeholder="Tên lĩnh vực"
                      onChange={(e) => setMajor(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md">
                    {!editMJ && (
                      <button className="btn btn-warning" onClick={submitMajor}>
                        Thêm
                      </button>
                    )}
                    {editMJ && (
                      <button
                        className="btn btn-danger"
                        onClick={submitEditMajor}
                      >
                        Sửa
                      </button>
                    )}
                    <button
                      className="btn btn-secondary ms-3"
                      onClick={() => {
                        setAddMj(false);
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="row mb-2">
              <div className="col-md-7">
                <div className="mb-2">
                  <div className="table-responsive">
                    <table className="table table-primary">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Loại Khóa học</th>
                          <th scope="col">Tình trạng</th>
                          <th scope="col">Thời gian tạo</th>
                          <th scope="col">Tùy chỉnh</th>
                        </tr>
                      </thead>
                      <tbody>
                        {majors &&
                          majors.length > 0 &&
                          majors.map((item, index) => (
                            <tr key={index} className="">
                              <td>{++index}</td>
                              <td>{item.name}</td>
                              <td>{item.status==0 &&
                              <b onClick={()=>{switchMajor(item.id)}}>Đang khóa</b>
                              }
                              {item.status==1 &&
                              <b onClick={()=>{switchMajor(item.id)}}>Đang mở</b>
                              }
                              </td>
                              <td>{item.created_at}</td>
                              <td>
                                <button
                                  className="btn btn-warning mr-3"
                                  onClick={() => {
                                    editMajor(item.id, item.name);
                                  }}
                                >
                                  Sửa
                                </button>
                                <button className="btn btn-danger ms-2 " onClick={()=>deleteMajor(item.id)}>Xóa</button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Majors;
