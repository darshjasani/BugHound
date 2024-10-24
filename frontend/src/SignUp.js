import { Button } from '@material-ui/core';
import React,{useState, useEffect} from 'react';
import './SignUp.css'
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import axios from 'axios';



const Signup = ()=>{

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const [spwdt, setspwdT] = useState('password')
    const [scpwdt, setscpwdT] = useState('password')
    const [showq, setShowq] = useState('none');
    const history = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    const showPwd = ()=>{
        let spwd = document.getElementsByClassName('spwd')[0].type;
        setspwdT(spwd !== "password" ? "password" : "text")
    }

    const showCpwd = ()=>{
        let scpwd = document.getElementsByClassName('scpwd')[0].type;
        setscpwdT(scpwd !== "password" ? "password" : "text")
    }

    const generateName = ()=>{
        let result = ''
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        } 
        return result
    }


    const validate = ()=>{
        // if(email === '' || pwd === '' || cpwd === ''){
        //     alert('Please enter the details!!');
        // }
        // else if(pwd !== cpwd){
        //     alert("Password doesn't match!!");
        // }
        // else if(!emailRegex.test(email)){
        //     alert('Invalid email id!!')
        // }
        // else if(pwd.length < 8 || pwd.length > 16){
        //     alert('Password should be 8 to 16 character only!!')
        // }
        // else{
            insertIntoDB();
        
    }

    const insertIntoDB = async ()=>{
        try{
            const getResponse = await axios.get(`http://localhost:8000/login/${email}/${pwd}/`)
            alert("Email already exist. Enter new email id!!");
            
            
        }catch(error){
            const response = await axios.post(`http://localhost:8000/login/`,{
                    "email" : email,
                    "password":pwd,
                    "name":"Guest " + generateName(),
                    "age":23,
                })
                history('/home')
        }
    }

    return (
        <>
            <div className='signupBody'>
                <div className='signupCard'>
                    <div className='signup'>
                        <div className='logo'>
                            <></>
                            <>ChatHub</>
                        </div>

                        <p>Create your account</p>
                        <div>
                            Email :<br/>
                            <input
                            className='email' 
                            type='text' 
                            placeholder='Enter email id'
                            onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>

                        <div className='passWord'>
                            <div>
                                Password :<br/>
                                <input 
                                className='spwd' 
                                type={spwdt} 
                                placeholder='Enter password'
                                onChange={(e) => setCpwd(e.target.value)}
                            />
                            </div>
                            <button onClick={showPwd}>{spwdt === "password" ? <VisibilityIcon/> : <VisibilityOffIcon/>}</button>
                            <span className='qIcon'onMouseEnter={()=>setShowq('block')} onMouseLeave={()=>setShowq('none')} ><QuestionMarkIcon/></span>
                            <span className='pDetails' style={{display:showq}}>Password should be 8 to 16 character long.</span>
                        </div>

                        <div className='passWord'>
                            <div>
                                Confirm Password :<br/>
                                <input 
                                className='scpwd' 
                                type={scpwdt} 
                                placeholder='Enter confirm password'
                                onChange={(e) => setPwd(e.target.value)}
                            />
                            </div>
                            <button onClick={showCpwd}>{scpwdt === "password" ? <VisibilityIcon/> : <VisibilityOffIcon/>}</button>
                        </div>
                        
                        <div className='signupButton'>
                            <button onClick={validate}>Sign Up</button>
                        </div>
                    
                        <div className='loginLink'>
                            Already have an account? <a href='/'>Log In</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
      )
}

export default Signup;