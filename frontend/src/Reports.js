import React, { useEffect } from 'react'
import './Reports.css'
import axios from 'axios';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { doc } from 'firebase/firestore';
import img from './sss.png'
function Reports() {
    let {reportID, programName} = useParams();
    const user = JSON.parse(localStorage.getItem('userDetails'))
    const today = new Date(new Date().getTime() + (-8 * 60 * 60 * 1000)).toISOString().split('T')[0];
    const history = useNavigate();
    const [programRs, setProgramRs] = useState([]);
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState({"programName":"","bugType":"","severity":"","reproducible":"no","summary":"","problem":"","suggestedFix":"n/a","reportBy":"","date":"","status":"","assignTo":""})
    const [reportD, setReportD] = useState({"rid":reportID,"functionArea":"n/a","AssignTo":"n/a","file":"false","comments":"n/a","status":"open","priority":"n/a","resolution":"n/a","resolutionVersion":"n/a","resolvedBy":"n/a","resolveDate":today,"testedBy":"n/a","testedDate":today,"deferred":"no"});
    const [fileC, setfileC] = useState('');
    const [display, setDisplay] = useState(false);

    const getProgramName = async () =>{
        try{
          const response = await axios.get(`http://localhost:8000/programs/`)
          setProgramRs(
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

    const getReport = async () =>{
        try{
            const response = await axios.get(`http://localhost:8000/report/rid=${reportID}/`)
           
            setReports(
                {
                    "programName":programName,
                    "bugType":response.data[0].bugType,
                    "severity":response.data[0].severity,
                    "reproducible":response.data[0].reproducible,
                    "summary":response.data[0].summary,
                    "problem":response.data[0].problem,
                    "suggestedFix":response.data[0].suggestedFix === "no" ? "" : response.data[0].suggestedFix,
                    "reportBy":response.data[0].reportBy,
                    "date":response.data[0].date.split('T')[0]
                }
                
            )

            const res = await axios.get(`http://localhost:8000/reports/rid=${reportID}/`)
            res.data.map((r)=>{
                setReportD(
                    {
                        "rid":r.rid,
                        "functionArea":r.functionArea,
                        "AssignTo":r.AssignTo,
                        "file":r.file,
                        "comments":r.comments,
                        "status":r.status,
                        "priority":r.priority,
                        "resolution":r.resolution,
                        "resolutionVersion":r.resolutionVersion,
                        "resolvedBy":r.resolvedBy,
                        "testedBy":r.testedBy,
                        "deferred":r.deferred
                    }
                )
            })

            
            
           
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
        getReport();
        getProgramName();
        getUsers();
    },[])

    const handleReportChange = (e) =>{
        let {name, value } = e.target;
        if(name === "reproducible")
            value = value === "on" ? "yes" : "no"

        setReports((prevReport) => ({...prevReport, [name]:value}));
    }
    
    const handleReportsChange = (e) =>{
        let {name, value } = e.target;
        if(name === "deferred")
            value = value === "on" ? "yes" : "no"

        setReportD((prevReport) => ({...prevReport, [name]:value}));
        //console.log(reportD)
    }

    const handleFileChange = async (e) => {
        setReportD((prevReport) => ({...prevReport, "file":"true"}))
    }

    const cancelReport = (e) =>{
        e.preventDefault();
        const cancel = window.confirm("Do you want to cancel it?");
        if(cancel){
            setReports({"programName":"","bugType":"","severity":"","reproducible":"no","summary":"","problem":"","suggestedFix":"no","reportBy":user.username,"date":today})
            history("/home");
        }
    }

    const updateReport = async (e)=>{
        e.preventDefault();
        console.log(reportD)
        
        try{    
            const response = await axios.post(`http://localhost:8000/reports/`, reportD);

            if(reports.programName !== "COBOL Coder") {
                const res = await axios.put(`http://localhost:8000/report/rid=${reportID}/`, {"suggestedFix":reports.suggestedFix === "" ? "no" : reports.suggestedFix, "status":reportD.status, "assignTo":reportD.AssignTo});
            }
            alert("Updated Successfully");
            history('/home');
        }catch(err){
            console.log(err.response.data)
        }
    }


 return (
    <>
        <div className='reportBody'>
        <h1 className='title'>New Bug Report Entry Page</h1>
        <form>
           <div className='partOne'>
                <div>Program :&nbsp;
                    <select name="programName" >
                        <option value={reports.programName}>{reports.programName}</option>
                        
                    </select>
                </div>
                <div>Report Type :&nbsp;
                    <select name="bugType" >
                        <option value={reports.bugType}>{reports.bugType}</option>
                        
                    </select>
                </div>
                <div>Severity :&nbsp;
                    <select name="severity" >
                        <option value={reports.severity}>{reports.severity}</option>
                        
                    </select>
                </div>
                
           </div> 

           <div className='partTwo'>
                <div>
                    Problem Summary :&nbsp; 
                    <input type='text' value = {reports.summary} className='summary' placeholder='Enter a brief summary here ' name="summary"/> &nbsp;

                    Reproducible : 
                    <input type='checkbox' checked={reports.reproducible} className='check' name="reproducible"  />
                </div>
           </div>

           <div className='partThree'>
                <div>
                    Problem : &nbsp;
                    <textarea placeholder='Enter the Problem' name="problem" value={reports.problem}/>
                </div>
           </div>

           <div className='partFour'>
                <div>
                    Suggested Fix : &nbsp;
                    <textarea placeholder='Enter the Suggestion' name="suggestedFix" value = {reports.suggestedFix} onChange={handleReportChange}/>
                </div>
           </div>

           <div className='partFive'>
                <div>
                    Reported By :&nbsp;
                    <input type='text' value={reports.reportBy} />
                </div>
                <div>
                    Date :&nbsp;
                    <input type='date' name="date" value={reports.date} />
                </div>
           </div>

           <hr/>

           <div className='partSix'>
                <div>
                    Functional Area : &nbsp;
                    <select  id ="functionArea" name="functionArea" onChange={handleReportsChange}>
                        <option value="">{reportD.functionArea === 'n/a' ? 'Select a Function Area' : reportD.functionArea}</option>
                        <option>Add Edit Areas</option>
                        <option>Update Edit Areas</option>
                        <option>Delete Edit Areas</option>
                    </select>
                </div>
                <div>
                    Assign To : &nbsp;
                    <select id = 'AssignTo' name="AssignTo" onChange={handleReportsChange}>
                        <option value="">{reportD.AssignTo === 'n/a' ? 'Select a User' : reportD.AssignTo}</option>
                        {
                            users.map((user)=>(
                                <option value={user.username}>{user.username}</option>
                            ))
                        }
                        
                    </select>
                </div>   

                <div>
                    Attachment : <input type="file" onChange={handleFileChange} />
                    {
                        reportD.file === "true" && <button onClick={(e) => {setDisplay(true); e.preventDefault();}}>View</button>
                    }
                    {
                        display && reports.programName === "COBOL Coder" && 
                            <div style={{position:'absolute', top:'60%', left:'50%',transform:'translate(-60%,-50%)', backgroundColor:'white', padding:'15px'}}>
                            the translation of the "La distance n'est pas en kilomètres" is "The distance is not in kilometers".
                            </div>
                    }

                    {
                        display && reports.programName === "Bughound" && 
                            <img src={img} width='300' height='300' style={{position:'absolute', top:'60%', left:'50%',transform:'translate(-60%,-50%)', backgroundColor:'white', padding:'15px'}}/>
                    }
                </div>  
           </div>

           <div className='partFour'>
                <div>
                    Comments : &nbsp;
                    <textarea value={reportD.comments === 'n/a' ? '' : reportD.comments} placeholder='Enter the comment' name="comments" onChange={handleReportsChange}/>
                </div>
           </div>

           <div className='partOne'>
                <div>
                    Status : &nbsp;
                    <select name="status" onChange={(e) => {handleReportsChange(e); handleReportChange(e)}}>
                        <option value="">{reportD.status === 'open' ? 'Select a Status' : reportD.status}</option>
                        <option>Open</option>
                        <option>Closed</option>
                        <option>Resolved</option>
                    </select>
                </div>
                <div>
                    Priority : &nbsp;
                    <select id = 'priority' name="priority" onChange={handleReportsChange}>
                        <option value="">{reportD.priority === 'n/a' ? 'Select a Priority' : reportD.priority}</option>
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
                    <select name='resolution' onChange={handleReportsChange}>
                        <option value="">{reportD.resolution === 'n/a' ? 'Select a Resolution' : reportD.resolution}</option>
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
                    <select name='resolutionVersion' onChange={handleReportsChange}>
                        <option value="">{reportD.resolutionVersion === 'n/a' ? 'Select a Resolution Version' : reportD.resolutionVersion}</option>
                        <option>1,1</option>
                        <option>1,2</option>
                        <option>1,3</option>
                    </select>
                </div>  
           </div>

           <div className='partOne'>
                <div>
                    Resolved By : &nbsp;
                   
                    <select name='resolvedBy' onChange={handleReportsChange}>
                        <option value="">{reportD.resolvedBy === 'n/a' ? 'Select a User' : reportD.resolvedBy}</option>
                        {
                            users.map((user)=>(
                                <option value={user.username}>{user.username}</option>
                            ))
                        }
                        
                    </select>
                    
                </div>
                <div>
                    Date :&nbsp;
                    <input className = 'dd' type='date' value={today.split(' ')[0]} name='resolveDate' onChange={handleReportsChange}/>
                </div>
                <div>
                    Tested By : &nbsp;
                    <select name='testedBy' onChangeCapture={handleReportsChange}>
                        <option value="">{reportD.testedBy === 'n/a' ? 'Select a User' : reportD.testedBy}</option>
                        {
                            users.map((user)=>(
                                <option value={user.username}>{user.username}</option>
                            ))
                        }
                        
                    </select>
                </div>  
                <div>
                    Date :&nbsp;
                    <input className = 'dd' type='date' value={today.split(' ')[0]} name='testedDate' onChange={handleReportsChange}/>
                </div>   
                <div>
                    Treat as Deferred? :&nbsp;
                    <input  className= "def" type='checkbox'   name='deferred' onChange={handleReportsChange}/>
                </div>
           </div>

           <div className='buttons'>
               <div>
                    <button onClick={updateReport}>Update</button>
                    
                    <button onClick={cancelReport}>Cancel</button>
               </div>
           </div>
        </form>
        </div>
    </>
  )
}

export default Reports;