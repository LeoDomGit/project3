import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "../dashboard/css/app.css";
import axios from "axios";
import Loading from "../components/Loading";
function Home() {
  const url = "http://127.0.0.1:8000/api/";
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);

  const [loading, setLoading] = useState(false);
  const setAddUser = () => {
    handleShow1(true);
  };
  const setAddRole = () => {
    setIdEdit(0);
    setUserRole("");
    handleShow();
  };
  const [activeRoles, setActiveRoles] = useState([]);
  const [rolename, setUserRole] = useState("");
  const [roleList, setRolesList] = useState([]);
  const [idEdit, setIdEdit] = useState(0);
  const [idUsEdit, setIdUsEdit] = useState(0);

  const [username, setUsername] = useState("");
  const [email, setUseremail] = useState("");
  const [idRole, setidRole] = useState(0);
  const [users, setUsers] = useState([]);
  const [usernameedit, setUsernameedit] = useState("");
  const [emailedit, setUseremailedit] = useState("");
  const [idRoleedit, setidRoleedit] = useState(0);

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
  const checkEmail = (e) => {
    if (e.match(/(.+)@(gmail+)\.(com)/i)) {
      setUseremail(e);
    }
  };
  const checkEmailEdit = (e) => {
    if (e.match(/(.+)@(gmail+)\.(com)/i)) {
      setUseremailedit(e);
    }
  };
  const switchRole = (id) => {
    axios({
      method: "post",
      url: url + "switchrole",
      data: {
        id: id,
      },
    }).then((res) => {
      if (res.data.check == true) {
        Toast.fire({
          icon: "success",
          title: "Thay đổi thành công",
        });
        setRolesList(res.data.roles);
        res.data.roles.forEach((el) => {
          if (el.status == 1) {
            setActiveRoles([...activeRoles, el]);
          }
        });
        console.log(activeRoles);
      } else {
        Toast.fire({
          icon: "error",
          title: res.data.msg,
        });
      }
    });
  };
  const submitUserRole = () => {
    if (rolename == "") {
      Toast.fire({
        icon: "error",
        title: "Thiếu loại tài khoản",
      });
    } else {
      axios({
        method: "post",
        url: url + "role",
        data: {
          name: rolename,
        },
      }).then((res) => {
        if (res.data.check == true) {
          Toast.fire({
            icon: "success",
            title: "Sửa thành công",
          });
          setRolesList(res.data.roles);
          handleClose();
        } else if (res.data.check == false) {
          if (res.data.msg.name) {
            Toast.fire({
              icon: "error",
              title: res.data.msg.name,
            });
          }
        }
      });
    }
  };
  const setEditUserRole = (id, old) => {
    setIdEdit(id);
    setUserRole(old);
    handleShow();
  };
  const submitEditUserRole = () => {
    axios({
      method: "post",
      url: url + "editRole",
      data: {
        id: idEdit,
        name: rolename,
      },
    }).then((res) => {
      if (res.data.check == true) {
        Toast.fire({
          icon: "success",
          title: "Thêm thành công",
        });
        setRolesList(res.data.roles);
        handleClose();
      } else if (res.data.check == false) {
        if (res.data.msg.name) {
          Toast.fire({
            icon: "error",
            title: res.data.msg.name,
          });
        }
      }
    });
  };
  const deleteUserRole = (id) => {
    Swal.fire({
      icon: "question",
      text: "Xóa loại tài khoản?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Đúng",
      denyButtonText: `Đóng`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios({
          method: "post",
          url: url + "deleteRole",
          data: {
            id: id,
          },
        }).then((res) => {
          if (res.data.check == true) {
            Toast.fire({
              icon: "success",
              title: "Đã xóa thành công",
            });
          }
          setRolesList(res.data.roles);
        });
      } else if (result.isDenied) {
      }
    });
  };
  const submitNewUser = () => {
    if (username == "" || email == "" || idRole == 0) {
      Toast.fire({
        icon: "error",
        title: "Thiếu thông tin tài khoản",
      });
    } else {
      handleClose1();
      setLoading(true);
      axios({
        method: "post",
        url: url + "users",
        data: {
          username: username,
          email: email,
          idRole: idRole,
        },
      }).then((res) => {
        if (res.data.check == true) {
          Toast.fire({
            icon: "success",
            title: "Đã thêm tài khoản",
          });
          setUsers(res.data.users);
          setLoading(false);
          setUseremail("");
          setUsername("");
          setidRole(0);
          console.log(users);
          console.log(res.data.users);
        } else if (res.data.check == false) {
          setLoading(false);
          if (res.data.msg.username) {
            Toast.fire({
              icon: "error",
              title: res.data.msg.username,
            });
          } else if (res.data.msg.email) {
            Toast.fire({
              icon: "error",
              title: res.data.msg.email,
            });
          } else if (res.data.msg.idRole) {
            Toast.fire({
              icon: "error",
              title: res.data.msg.idRole,
            });
          }
        }
      });
    }
  };
  const submitEditUser = () => {
    if (usernameedit == "" || emailedit == "" || idRoleedit == 0||idUsEdit==0) {
      Toast.fire({
        icon: "error",
        title: "Thiếu thông tin tài khoản",
      });
    } else {
      handleClose2();
      setLoading(true);
      axios({
        method: "post",
        url: url + "editUser",
        data: {
            id:idUsEdit,
            username: usernameedit,
            email: emailedit,
            idRole: idRoleedit,
        },
      }).then((res) => {
        if (res.data.check == true) {
          Toast.fire({
            icon: "success",
            title: "Đã sửa tài khoản",
          });
            setIdUsEdit(0);
            setUsernameedit('');
            setUseremailedit('');
            setidRoleedit(0);
            setShow2(false);
            setLoading(false);
            setUsers(res.data.users);
        //   console.log(res.data.users);
        } else if (res.data.check == false) {
          setLoading(false);
          if (res.data.msg.username) {
            Toast.fire({
              icon: "error",
              title: res.data.msg.username,
            });
          } else if (res.data.msg.email) {
            Toast.fire({
              icon: "error",
              title: res.data.msg.email,
            });
          } else if (res.data.msg.idRole) {
            Toast.fire({
              icon: "error",
              title: res.data.msg.idRole,
            });
          }
        }
      });
    }
  };
  const switchUser =(id)=>{
    axios({
        method: "post",
        url: url + "switchUser",
        data:{
            id:id
        }
      }).then((res) => {
        setUsers(res.data);
      });
  }
  const deleteUser = (id)=>{
  
  }
  const editUser = (id, name, email, idRole) => {
    setIdUsEdit(id);
    setUsernameedit(name);
    setUseremailedit(email);
    setidRoleedit(idRole);
    setShow2(true);
  };
  useEffect(() => {
    axios({
      method: "get",
      url: url + "role",
    }).then((res) => {
      setRolesList(res.data);
      var arr = [];
      res.data.forEach((el) => {
        if (el.status == 1) {
          arr.push(el);
        }
      });
      setActiveRoles(arr);
    });
    axios({
      method: "get",
      url: url + "users",
    }).then((res) => {
      setUsers(res.data);
    });
    console.log(users);
  }, []);
  return (
    <div className="wrapper">
      <Header />
      {loading && <Loading />}
      {/* ==========================Modal Tài khoản================================= */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header>
          <Modal.Title>Tài khoản Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md">
              <input
                type="text"
                placeholder="Tên tài khoản"
                onChange={(e) => setUsername(e.target.value)}
                className={`form-control ${
                  username == "" ? "border border-danger" : ""
                }`}
              />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => checkEmail(e.target.value)}
                className={`form-control mt-3 ${
                  email == "" ? "border border-danger" : ""
                }`}
              />
              <select
                name=""
                className="form-control mt-3"
                onChange={(e) => setidRole(e.target.value)}
                value={idRole}
              >
                <option value="0" selected disabled>
                  Chọn loại tài khoản
                </option>
                {activeRoles &&
                  activeRoles.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitNewUser}>
            Lưu
          </Button>
          <Button variant="secondary" onClick={handleClose1}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      {/* =========================Modal Loại tài khoản=================================== */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title
            style={{
              fontSize: "20px",
              fontFamily: '"Times New Roman", Times, serif',
            }}
          >
            Loại tài khoản
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <input
              type="text"
              placeholder="Loại tài khoản"
              onChange={(e) => setUserRole(e.target.value)}
              value={rolename}
              className="form-control"
            />
          </>
        </Modal.Body>
        <Modal.Footer>
          {idEdit == 0 && (
            <Button variant="primary" onClick={submitUserRole}>
              Hoàn thành
            </Button>
          )}
          {idEdit != 0 && (
            <Button variant="warning" onClick={submitEditUserRole}>
              Sửa
            </Button>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      {/* =========================Modal Edit tài khoản ================================== */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Chỉnh sửa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md">
              <input
                type="text"
                placeholder="Tên tài khoản"
                value={usernameedit}
                onChange={(e) => setUsernameedit(e.target.value)}
                className={`form-control ${
                  usernameedit == "" ? "border border-danger" : ""
                }`}
              />
              <input
                type="text"
                placeholder="Email"
                value={emailedit}
                onChange={(e) => checkEmailEdit(e.target.value)}
                className={`form-control mt-3 ${
                  emailedit == "" ? "border border-danger" : ""
                }`}
              />
              <select
                name=""
                className="form-control mt-3"
                onChange={(e) => setidRoleedit(e.target.value)}
                value={idRoleedit}
              >
                <option value="0" selected disabled>
                  Chọn loại tài khoản
                </option>
                {activeRoles &&
                  activeRoles.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Đóng
          </Button>
          <Button variant="primary" onClick={submitEditUser}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="main">
        <nav className="navbar navbar-expand navbar-light navbar-bg">
          <button
            href="#"
            className=" ms-3 btn btn-primary"
            onClick={setAddRole}
          >
            Thêm loại
          </button>
          <button
            href="#"
            className=" ms-3 btn btn-success"
            onClick={setAddUser}
          >
            Thêm tài khoản
          </button>
        </nav>
        <div className="ms-2 row mt-4 w-100">
          {roleList.length > 0 && (
            <div className="col-md-5">
              <div className="table-responsive">
                <table className="table table-primary">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Loại tài khoản</th>
                      <th scope="col">Status</th>
                      <th scope="col">Ngày tạo</th>
                      <th scope="col">Tùy chỉnh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleList.map((item, index) => (
                      <tr key={index} className="">
                        <td>{++index}</td>
                        <td>
                          <b
                            onClick={(e) => setEditUserRole(item.id, item.name)}
                          >
                            {item.name}
                          </b>
                        </td>
                        <td>
                          {item.status == 0 && (
                            <b onClick={(e) => switchRole(item.id)}>
                              Đang đóng
                            </b>
                          )}
                          {item.status == 1 && (
                            <b onClick={(e) => switchRole(item.id)}>
                              Đang hoạt động
                            </b>
                          )}
                        </td>
                        <td>{item.created_at}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={(e) => deleteUserRole(item.id)}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {users && users.length > 0 && (
            <div  className="col-md">
              <div className="table-responsive">
                <table className="table table-primary">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Loại tài khoản</th>
                      <th>Trạng thái</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => (
                      <tr key={item.id} className="">
                        <td>
                          <span className="edit">{++index}</span>
                        </td>
                        <td>
                          <span className="edit">{item.name}</span>
                        </td>
                        <td>
                          <span className="edit">{item.email}</span>
                        </td>
                        <td>
                          <span className="edit">{item.rolename}</span>
                        </td>
                        <td>
                            {item.status==0 ?
                            <b className="edit" onClick={()=>switchUser(item.id)}>Đang đóng</b>
                            :
                            <b className="edit" onClick={()=>switchUser(item.id)}>Đang mở</b> 
                            }
                        </td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={(e)=>deleteUser(item.id)}>Xóa</button>
                          <button
                            className="ms-3 btn btn-warning btn-sm"
                            onClick={(e) =>
                              editUser(
                                item.id,
                                item.name,
                                item.email,
                                item.idRole
                              )
                            }
                          >
                            Sửa
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
      </div>
    </div>
  );
}

export default Home;
