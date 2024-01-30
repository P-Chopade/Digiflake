import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";

const Dashboard = () => {
  const imageUrl =
    "https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png";

  const anvigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout from this page?"
    );
    if (confirmLogout) {
      await axios.get("http://localhost:3000/auth/logout").then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      });
    }
  };
  return (
    <div className="container-fluid" style={{ backgroundColor: "white" }}>
      <div className="row flex-nowrap">
        <div
          className="col-auto col-md-3 col-xl-2 px-sm-0 px-0 "
          style={{ backgroundColor: "whitesmoke" }}
        >
          <div
            className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-black min-vh-100"
            style={{ backgroundColor: "blueviolet" }}
          >
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto  text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                <img
                  src={imageUrl}
                  alt="Description of the image"
                  style={{
                    display: "flex",
                    marginLeft: "30px",
                    height: "15vh",
                  }}
                />
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-5 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Home</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/Category"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-5 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/Product"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-5 bi bi-box-seam"></i>
                  <span className="ms-2 d-none d-sm-inline">Product</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div
            className="p-4 d-flex justify-content-center shadow"
            style={{ backgroundColor: "blueviolet" }}
          >
            <Link>
              <FaRegUserCircle
                onClick={handleLogout}
                style={{
                  fontSize: "2.5em",
                  color: "white",
                  marginLeft: "1150px",
                }}
              />
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
