import { Button } from '@material-ui/core';
import React,{useEffect, useState} from 'react';
import './Login.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AxiosInstance  from './Axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = ()=>{

    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdt, setpwdT] = useState('password')
    const [type, setType] = useState(0);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const showPwd = ()=>{
        let pwd = document.getElementsByClassName('pwd')[0].type;
        if(pwd === "password"){
            setpwdT('text')
        }
        else{
            setpwdT('password')
        }
    }
    
    const validate = () =>{
        // if(email == '' || pwd == '')
        //     alert('Please enter details!!')
        // else if(!emailRegex.test(email))
        //     alert('Invalid email!!')
        // else if(pwd.length < 8 || pwd.length > 16 )
        //     alert('Password length should be 8 to 16 only!!')
        // else
            validateCredentials();
    }

    const validateCredentials = async ()=>{
        try{
            const response = await axios.get(`http://localhost:8000/login/${email}/${pwd}/${type}/`)
            
            let arr = {
                username : response.data.username
            }
            localStorage.setItem('userDetails', JSON.stringify(arr));
            history('/home');


        }catch(error){
            alert("Incorrect Details. Try Again !!")
        }
    }
    
    return (
        <>
            <div className='loginBody'>
                <div className='card'>
                    <div className='login'>
                        <div className='logo'>
                            <span>BugHound</span>
                        </div>

                        <p>Login into your Account</p>
                        <div>
                            Username :<br/>
                            <input 
                            className='email'
                            type='text' 
                            placeholder='Enter your username'
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='passWord'>
                            <div>
                                Password :<br/>
                                <input 
                                className='pwd' 
                                type={pwdt} 
                                placeholder='Enter password'
                                onChange={(e) => setPwd(e.target.value)}
                            />
                            </div>
                            <button onClick={showPwd}>{pwdt === "password" ? <VisibilityIcon/> : <VisibilityOffIcon/>}</button>
                        </div>

                        <div className='forgetpwd'>
                            <a href='/forgetpwd'>Forget Password?</a>
                        </div>

                        <div className='userType'>
                            <div>Access Type : </div>
                            <select onChange={(e)=>setType(e.target.value)}>
                                <option value="">Select an option : </option>
                                <option value="3">Admin</option>
                                <option value="2">Tester</option>
                                <option value="1">User</option>
                            </select>
                        </div>
                        <div className='loginButton'>
                            <button onClick={validate}>
                                Login 
                            </button>
                        </div>
                        <div className='signupLink'>
                            Don't have an account? <a href='/signup'>Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
      )
}

export default Login;