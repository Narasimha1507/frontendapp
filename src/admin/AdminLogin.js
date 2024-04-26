import React,{ useState }  from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config'


export default function AdminLogin({onAdminLogin}) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
      });
      const [message, setMessage] = useState("");
      const [error, setError] = useState("");
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${config.url}/checkadminlogin`, formData);
          if (response.data != null) 
          {
            onAdminLogin(); // this will invoke onAdminLogin() in App.js
    
            localStorage.setItem('admin', JSON.stringify(response.data));
            
            navigate("/adminhome");
          } 
          else 
          {
            setMessage("Login Failed");
            setError("");
          }
        } catch (error) {
          setMessage("");
          setError(error.message);
        }
      };
  return (
    <div className='logincontainer'>
      <form onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        {
        message ? <h4 align="center" color='white'>{message}</h4> : <h4 align="center">{error}</h4>
        }
        <div className='input-box'>
          <input type='text' name='username' value={formData.username} onChange={handleChange} placeholder='Enter Username' required></input>
        </div>
        <div className='input-box'>
          <input type='password' name="password" value={formData.password} onChange={handleChange} placeholder='Enter Password' required></input>
        </div>
        <div className='remember-forgot'>
        </div>
        <Button variant="outlined" type='submit' className="btn"><p>Login</p></Button>
        </form>
    </div>
  )
}
