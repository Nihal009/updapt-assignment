
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import instance from "../axiosUrl";
import axios from "axios";



function SignUp(){

  const navigate=useNavigate();
    const [formData,setFormData]=useState({name:"",email:"",password:""})

async function handleSignup(e){
  e.preventDefault()
  console.log("form",formData)
await axios.post('http://localhost:3000/api/auth/Signup',formData,{
  withCredentials: true
})
.then(function (response){
  console.log(response)
  navigate('/login')
  
})
.catch(function (response){
  console.log(response)
})

}


return (<>
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
            <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Enter your details to register</h2>
            <form>
              <div className="row gy-2 overflow-hidden">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="firstName" id="firstName" placeholder="First Name" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} required/>
                    <label for="firstName" className="form-label">Name</label>
                  </div>
                </div>
        
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} required/>
                    <label for="email" className="form-label">Email</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" name="password" id="password" value={formData.password} placeholder="Password" onChange={(e)=>setFormData({...formData,password:e.target.value})} required/>
                    <label for="password" className="form-label">Password</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-grid my-3">
                    <button className="btn btn-primary btn-lg" onClick={handleSignup}>Sign up</button>
                  </div>
                </div>
                <div className="col-12">
                  <p className="m-0 text-secondary text-center">Already have an account? <a href="#!" className="link-primary text-decoration-none">Sign in</a></p>
                </div>
                <hr />
                <Link to="/login">
                <div className="col-12">
                  <div className="d-grid my-3">
                    
                    <button className="btn btn-primary btn-lg" type="submit">Login</button>
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
</>)

}



export default SignUp;