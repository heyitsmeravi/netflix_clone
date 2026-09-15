// import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png';
import {useState} from 'react'
import {signin, signup} from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';
const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const userAuth = async (event) =>{
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In"){
      await signin(email,password);
    }else {
      await signup(name,email,password);
    }
    setLoading(false);    
  }
  const [signState, setSignState] = useState("Sign In");
  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" className="spinner" />  
    </div>:
    <div className='login'>
      <img src={logo} alt="" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="">
          {signState ==="Sign Up" ? <input type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>:<></>}
          <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
          <button className="login-btn" onClick={userAuth} type="submit">{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember me</label>
            </div>
          <p>Need help?</p>
          </div>
        </form>
        <div className="form-switch">
          { signState ==="Sign In" ? 
          <p>
            New to Netflix? <span onClick = { () => setSignState("Sign Up")} >Sign up now</span>
          </p> :
          <p>
            Already have an account? <span onClick = { () => setSignState("Sign In") }>Sign in now</span>
          </p>
          }
        </div>
      </div>
    </div>
  )
}

export default Login
