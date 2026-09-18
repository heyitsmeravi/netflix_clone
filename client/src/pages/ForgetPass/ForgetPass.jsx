import './ForgetPass.css'
import logo from '../../assets/logo.png';
import { resetPassword } from '../../firebase';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
const ForgetPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); 
  const handleFormSubmit =  async (e) => {
            e.preventDefault();
            console.log(email);
            const success = await resetPassword(email); 
            if (success){
              setTimeout(()=>{
                navigate('/login');
              },2000);
            }  
  }
  return (
    <div className='forgetpass'>
    < img src={logo} alt="" className="forgetpass-logo" />
     <form action="" className="forgetpass-form" onSubmit = {handleFormSubmit}>
        <h1>Reset Password</h1>
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <button className="forgetpass-btn" type="submit"  >Reset Password</button>
     </form>
    </div>
  )
}

export default ForgetPass
