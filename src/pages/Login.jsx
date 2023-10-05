import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Loading from "../components/Loading";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Swal from "sweetalert2";
function Login() {
  const [user, setUser] = useState([]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url = "http://127.0.0.1:8000/api/";
  const checkEmail = (e) => {
    if (e.match(/(.+)@(gmail+)\.(com)/i)) {
      setEmail(e);
    }
  };
  const submitLogin = () => {
    if (email != "" && password != "") {
      axios({
        method: "post",
        url: url + "checkLogin",
        data: {
          email: email,
          password: password,
        },
      }).then((res) => {
        if (res.data.check == true) {
          Toast.fire({
            icon: "success",
            title: "Đăng nhập thành công",
          }).then(() => {
            localStorage.setItem("token", res.data.token);
            window.location.replace("/edu");
          });
        } else if (res.data.check == false) {
          if (res.data.msg.email) {
            Toast.fire({
              icon: "error",
              title: res.data.msg.email,
            });
          } else if (res.data.msg.password) {
            Toast.fire({
              icon: "error",
              title: res.data.msg.password,
            });
          } else if (res.data.msg) {
            Toast.fire({
              icon: "error",
              title: res.data.msg,
            });
          }
        }
      });
    } else {
      console.log(email, password);
      Toast.fire({
        icon: "error",
        title: "Chưa nhập đủ thông tin tài khoản",
      });
    }
  };
  useEffect(() => {
    localStorage.removeItem("token");
  });
  useEffect(() => {
    if (user && user.length!=0) {
      axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
              }
          })
          .then((res) => {
              var email = res.data.email;
              console.log(email);
              axios.post(url + "checkAdmin", {
                  email: email,
                })
                .then((res) => {
                  if(res.data.check==true){
                    localStorage.setItem('email',email);
                    window.location.replace('/edu');
                  }
                 
                });
          })
          .catch((err) => console.log(err));
  }
},
[ user ]);
  return (
    <>
      <div className="container ">
        <div className="loginArea">
          <div className="row">
            <div className="col-md">
              <img
                className="img-fluid"
                src="https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg"
                alt=""
              />
            </div>
            <div className="col-md">
              <div className="row pt-5 mt-5">
                <div className="col-md">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    onChange={(e) => checkEmail(e.target.value)}
                    placeholder="Email tài khoản"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md">
                  <label htmlFor="">Mật khẩu</label>
                  <input
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => submitLogin()}
                  >
                    Đăng nhập
                  </button>
                  <button
                    className="btn btn-warning ms-3"
                    style={{ borderRadius: "50%" }}
                    onClick={() => login()}
                  >
                    <i className="bx bxl-gmail"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
