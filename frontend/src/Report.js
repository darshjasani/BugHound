import React, { useEffect } from 'react'
import './Report.css'
import axios from 'axios';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function Report() {
    const user = JSON.parse(localStorage.getItem('userDetails'))
    const today = new Date(new Date().getTime() + (-8 * 60 * 60 * 1000)).toISOString().split('T')[0];
    const history = useNavigate();
    const [programR, setProgramR] = useState([]);
    const [users, setUsers] = useState([]);
    const [report, setReport] = useState({"programName":"","bugType":"","severity":"","reproducible":"no","summary":"","problem":"","suggestedFix":"no","reportBy":user.username,"date":today})
    
    const getProgramName = async () =>{
        try{
          const response = await axios.get(`http://localhost:8000/programs/`)
          setProgramR(
            response.data.map((program)=>({
              "pid":program.pid,
              "programName":program.programName,
              "version":program.version,
              "release":program.release
            }))
          )
        }catch(err){
          console.log(err);
        }
    }

    const getUsers = async () =>{
        console.log(today.split(' '))
        try{
            const response = await axios.get(`http://localhost:8000/login/`)
            setUsers(
              response.data.map((user)=>({
                "id":user.id,
                "username":user.username,
                "loginid":user.loginid,
                "accessType":user.accessType
              }))
            )
          }catch(err){
            console.log(err)
          }
    }

    useEffect(()=>{
        getProgramName();
        getUsers();
    },[])

    const handleReportChange = (e) =>{
        let {name, value } = e.target;
        if(name === "reproducible")
            value = value === "on" ? "yes" : "no"

        setReport((prevReport) => ({...prevReport, [name]:value}));
    }
    
    const cancelReport = (e) =>{
        e.preventDefault();
        const cancel = window.confirm("Do you want to cancel it?");
        if(cancel){
            setReport({"programName":"","bugType":"","severity":"","reproducible":"no","summary":"","problem":"","suggestedFix":"no","reportBy":user.username,"date":today})
            history("/home");
        }
    }

    const submitReport = (e)=>{
        e.preventDefault()
        let flag = 0;
        for( let key in report){
            if(report[key] === ""){
                alert("Please enter details in :" + key)
                flag = 1;
                break
            }
        }
        if(flag === 0)
            addReport(); 
    }

    const addReport = async ()=> {
        try{
            const response = await axios.post(`http://localhost:8000/report/`,report)
            alert("Report submitted successfully");
            const nextStep = window.confirm("Do you want to add another report ?")
            if(nextStep){
                window.location.reload();
            }
            else{
                history('/home');
            }
        }catch(err){    
            console.log(err);
        }
    }
 return (
    <>
        <div className='reportBody'>
        <h1 className='title'>New Bug Report Entry Page</h1>
        <form>
           <div className='partOne'>
                <div>Program :&nbsp;
                    <select name="programName" onChange={handleReportChange}>
                        <option value="">Select a Program</option>
                        {
                            programR.map(program=>(
                                <option value={program.pid}>{program.programName + " V" + program.version + " R" + program.release}</option>
                            ))
                        }
                    </select>
                </div>
                <div>Report Type :&nbsp;
                    <select name="bugType" onChange={handleReportChange}>
                        <option value="">Select a Type</option>
                        <option>Coding Error</option>
                        <option>Design Issue</option>
                        <option>Suggestion</option>
                        <option>Documentation</option>
                        <option>Hardware</option>
                        <option>Query</option>
                    </select>
                </div>
                <div>Severity :&nbsp;
                    <select name="severity" onChange={handleReportChange}>
                        <option value="">Select a Severity</option>
                        <option>Minor</option>
                        <option>Serious</option>
                        <option>Fatal</option>
                    </select>
                </div>
                
           </div> 

           <div className='partTwo'>
                <div>
                    Problem Summary :&nbsp; 
                    <input type='text' className='summary' placeholder='Enter a brief summary here ' name="summary" onChange={handleReportChange}/> &nbsp;

                    Reproducible : 
                    <input type='checkbox' className='check' name="reproducible" onChange={handleReportChange} />
                </div>
           </div>

           <div className='partThree'>
                <div>
                    Problem : &nbsp;
                    <textarea placeholder='Enter the Problem' name="problem" onChange={handleReportChange}/>
                </div>
           </div>

           <div className='partFour'>
                <div>
                    Suggested Fix : &nbsp;
                    <textarea placeholder='Enter the Suggestion' name="suggestedFix" onChange={handleReportChange}/>
                </div>
           </div>

           <div className='partFive'>
                <div>
                    Reported By :&nbsp;
                    {/* <select name="reportBy" onChange={handleReportChange}>
                        <option value=""> Select a User</option>
                        {
                            users.map(user => (
                                <option value={user.uid}>{user.username}</option>
                            ))
                        }
                    </select> */}
                    <input type='text' value={user.username} />
                </div>
                <div>
                    Date :&nbsp;
                    <input type='date' name="date" value={today.split(' ')[0]} onChange={handleReportChange}/>
                </div>
           </div>

           <hr/>

           <div className='partSix'>
                <div>
                    Functional Area : &nbsp;
                    <select>
                        <option>A</option>
                        <option>B</option>
                    </select>
                </div>
                <div>
                    Assign To : &nbsp;
                    <select>
                        <option>A</option>
                        <option>B</option>
                    </select>
                </div>  

                <div>
                    Attachment : <input type="file" />
                </div>   
           </div>

           <div className='partFour'>
                <div>
                    Comments : &nbsp;
                    <textarea placeholder='Enter the comment'/>
                </div>
           </div>

           <div className='partOne'>
                <div>
                    Status : &nbsp;
                    <select>
                        <option>Open</option>
                        <option>Closed</option>
                        <option>Resolved</option>
                    </select>
                </div>
                <div>
                    Priority : &nbsp;
                    <select>
                        <option>Fix immediately</option>
                        <option>Fix as soon as possible</option>
                        <option>Fix before next milestone</option>
                        <option>Fix before release</option>
                        <option>Fix if possible</option>
                        <option>Optional</option>

                    </select>
                </div>
                <div>
                    Resolution : &nbsp;
                    <select>
                        <option>Pending</option>
                        <option>Fixed</option>
                        <option>Cannot be reproduced</option>
                        <option>Deferred</option>
                        <option>As designed</option>
                        <option>Withdrawn by reporter</option>
                        <option>Need more info</option>
                        <option>Disagree with suggestion</option>
                        <option>Duplicate</option>
                    </select>
                </div>
                <div>
                    Resolution Version : &nbsp;
                    <select>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                    </select>
                </div>  
           </div>

           <div className='partOne'>
                <div>
                    Resolved By : &nbsp;
                    <select>
                        <option>Mike</option>
                        <option>Rachel</option>
                        <option>Suzane</option>
                        <option>Dash</option>
                        <option>Harvey</option>
                    </select>
                </div>
                <div>
                    Date :&nbsp;
                    <input className='dd' type='date'/>
                </div>
                <div>
                    Tested By : &nbsp;
                    <select>
                        <option>Mike</option>
                        <option>Rachel</option>
                        <option>Suzane</option>
                        <option>Dash</option>
                        <option>Harvey</option>
                    </select>
                </div>  
                <div>
                    Date :&nbsp;
                    <input className='dd' type='date'/>
                </div>   
                <div>
                    Treat as Deferred? :&nbsp;
                    <input className = 'def'  type='checkbox'/>
                </div>
           </div>

           <div className='buttons'>
               <div>
                    <button onClick={submitReport}>Submit</button>
                    
                    <button onClick={cancelReport}>Cancel</button>
               </div>
           </div>
        </form>
        </div>
    </>
  )
}

export default Report;