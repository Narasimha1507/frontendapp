import React,{ useState }  from 'react'
import Button from '@mui/material/Button';
import "./login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config'


export default function CustomerLogin({onCustomerLogin,onSellerLogin}) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message,setMessage] = useState("")
  const [error,setError] = useState("")

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const customerresponse = await axios.post(`${config.url}/checkcustomerlogin`, formData);
      const sellerresponse = await axios.post(`${config.url}/checksellerlogin`, formData);
      if (customerresponse.data != null) 
      {
        onCustomerLogin();

        localStorage.setItem('customer', JSON.stringify(customerresponse.data));

        navigate("/customerhome");
      } 
      else if(sellerresponse.data != null) 
      {
        onSellerLogin();

        localStorage.setItem('seller', JSON.stringify(sellerresponse.data));

        navigate("/sellerhome");
      } 
      else 
      {
        setMessage("Login Failed")
        setError("")
      }
    } 
    catch (error) 
    {
      setMessage("")
      setError(error.message)
    }
  };
  return (
    <div className='logincontainer'>
        <h1>Login</h1>
        {
        message ? <h4 align="center" color='white'>{message}</h4> : <h4 align="center">{error}</h4>
        }
        <form onSubmit={handleSubmit}>
        <div className='input-box'>
          <input type='email' id="email" value={formData.email} onChange={handleChange} placeholder='Enter Email' required></input>
        </div>
        <div className='input-box'>
          <input type='password' id="password" value={formData.password} onChange={handleChange} placeholder='Enter Password' required></input>
        </div>
        <div className='remember-forgot'>
          <label><input type='checkbox'/>Remember me</label>
          <a href='/forgotpassword'>Forgot Password?</a>
        </div>
        <Button variant="outlined" type='submit' className="btn"><p>Login</p></Button>
        <div className='register-link'>
            <p>Dont have an account?<a href='/customerregistration'>Register Here</a></p>
        </div>
        </form>
    </div>
  )
}
