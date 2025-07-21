// import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./App.css";
import instance from "../axiosUrl";
import axios from "axios";


function Login(){
  const navigate=useNavigate();
const [formData,setFormData]=useState({email:"",password:""})
function handleLogin(e){
  e.preventDefault()
  axios.post('http://localhost:3000/api/auth/login',formData,{ withCredentials: true })
  .then(function (response){
    if(response.status===200 ){

      navigate('/')
    }
    console.log(response)
  })
  .catch( function (response){
    console.log(response)
  })
}
return (
    <>
    <section className="bg-light py-5 py-md-5">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
        <div className="card border border-light-subtle rounded-3 shadow-sm">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="text-center mb-3">
              <a href="#!">

              </a>
            </div>
            <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Login</h2>
            <hr />
            <form>
              <div className="row gy-2 overflow-hidden">
        
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" name="email" id="email" 
                    value={formData.email}
                    placeholder="name@example.com" required onChange={(e)=>setFormData({...formData,email:e.target.value})}/>
                    <label for="email" className="form-label">Email</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" value={formData.password} name="password" id="password"  placeholder="Password" onChange={(e)=>setFormData({...formData,password:e.target.value})} required/>
                    <label for="password" className="form-label">Password</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-grid my-3">
                    <button className="btn btn-primary btn-lg"  onClick={handleLogin}>Login</button>
                  </div>
                </div>
                
                <hr />
                <div className="col-12">
                  <p className="m-0 text-secondary text-center">Don't have an account?</p>
                </div>
                <Link to="/Signup">
                <div className="col-12">
                  <div className="d-grid my-3">
                    <button className="btn btn-primary btn-lg" type="submit">Sign up</button>
                  </div>
                </div>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
)

}

export default Login;
