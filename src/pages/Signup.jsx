import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import api from '../api';
import toast from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({name : "", email : "", phone: "", password : "", confirmPassword : "", role : ""});

  function changeHandler(event){
    setFormData((prev)=>{
        return({
            ...prev,
            [event.target.name] : event.target.type ==="checkbox" ? event.target.checked : event.target.value
        })
    })
  }

  async function handleSubmit(event){
    event.preventDefault();
    try{
     const res = await api.post("/userSignup", formData); 
     console.log(res.data);
     toast.success("User Signup success");
     navigate("/login");
    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="role">Select Role</label>
          <select id="role" name='role' onChange={changeHandler} required >
            <option value="">-- Choose Role --</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>

          <label htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="John Doe" 
            name='name'
            onChange={changeHandler}
            required 
          />

          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            id="email" 
            placeholder="you@example.com"
            name='email'
            onChange={changeHandler}
            required 
          />

          <label htmlFor="phone">Phone</label>
          <input 
            type="phone" 
            id="phone"
            className='loginInput'
            placeholder="Enter your phone no."
            name='phone'
            onChange={changeHandler}
            required 
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Create a password" 
            name='password'
            onChange={changeHandler}
            required 
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            placeholder="Confirm password" 
            name='confirmPassword'
            onChange={changeHandler}
            required 
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
