import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { UserContex } from '../contex/userContex';
import toast from 'react-hot-toast';
import api from '../api';

function Login() {

  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({email : "" , password : "", rememberMe : false});
  const {setUser} = useContext(UserContex);
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
      const res = await api.post("/userLogin", formData);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.user);
      setUser(res.data);
      toast.success("User Login success");
      navigate("/");
    }
    catch(error){
      toast.error(error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign in to your account</h2>
        <form onSubmit={handleSubmit}>

          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            id="email" 
            className='loginInput'
            placeholder="example@mail.com"
            name="email"
            onChange={changeHandler}
            required 
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password"
            className='loginInput'
            placeholder="Enter your password"
            name='password'
            onChange={changeHandler}
            required 
          />

          <div className='rememberMeContainer'>
            <input 
                type='checkbox' 
                id='remeberMe'
                name='rememberMe'
                onChange={changeHandler}
            />
            <label htmlFor='remeberMe' className='remember-label'>Remember Me</label>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="signup-link">
          Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
        </p>

      </div>
    </div>
  );
}

export default Login;

