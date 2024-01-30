import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
    const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3000/verify')
    .then(result => {
      if(result.data.Status) {
        if(result.data.role === "admin") {
          navigate('/dashboard')
        } 
      }
    }).catch(err =>console.log(err))
  }, [])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage" style={{ backgroundImage: 'url("../Images/chill-code.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '100% 120%' }}>
    <div className="p-3 rounded w-25 border loginForm" style={{backgroundColor:'whitesmoke'}}>
      <h2 className="text-center">Digitalflake Login</h2>
      <div className="d-flex justify-content-between mt-5 mb-2">   
        <button type="button" className="btn btn-success" style={{ marginLeft: '135px' , backgroundColor: 'blueviolet'  }} onClick={() => { navigate('/adminlogin') }}>
          Admin
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default Start;
