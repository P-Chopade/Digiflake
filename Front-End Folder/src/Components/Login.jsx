import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const imageUrl =
    "https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png";

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/adminlogin", values)
      .then((result) => {
        console.log(result);
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <img
        src={imageUrl}
        alt="Description of the image"
        style={{
          marginTop: "70px",
          marginLeft: "680px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "15vh",
        }}
      />
      <h3 style={{ marginLeft: "580px" }}>Welcome to DigitalFlake Admin</h3>

      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div
          className="p-3 rounded w-25 border loginForm"
          style={{ marginBottom: "350px" }}
        >
          <div className="text-warning">{error && error}</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>
                <strong>Email ID</strong>
              </label>
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter Email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className="form-control rounded-0"
              />
            </div>
            <div className="mb-3">
              <label>
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className="form-control rounded-0"
              />
            </div>
            <button
              className="btn btn-success w-100 rounded-0 mb-2"
              style={{ backgroundColor: "blueviolet" }}
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
