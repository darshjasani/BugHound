import axios from 'axios';
import React, { useEffect, useState, version }  from 'react';
import { useNavigate } from 'react-router-dom';
import Report  from './Report';
import './Home.css'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
function Home() {

    const [showUser, setShowUser] = useState(false);
    const [showProgram, setShowProgram] = useState(false);
    const [showProgramArea, setShowProgramArea] = useState(false);
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('userDetails'));
    const [program, setProgram] = useState({programName :"", version:1, release:1});
    const [userDetails, setuserDetails] = useState({username :"", loginid:"", password:"", accessType:""});
    const [fields, setFields] = useState([{ id: 1, value: '' }]);
    const [nextId, setNextId] = useState(2); 
    const [pName, setPName] = useState([])
    const [version, setVersion] = useState([])
    const [release, setRelease] = useState([])
    const [selectProgram, setSelectProgram] = useState(null);
    const [selectVersion, setSelectVersion] = useState(1);
    const [pid, setpid] = useState(1);
    const [allUsers, setallUser] = useState([]);
    const [updateUser, setUpdateUser] = useState({id:"",username :"", loginid:"", password:"", accessType:""})
    const [updateProgram, setUpdateProgram] = useState({pid:"", programName:"", version:"", release:""})
    const [pAreaID, setpAreaID ] = useState();
    const [pArea, setpArea] = useState([]);

    const getProgramName = async () =>{
      try{
        const response = await axios.get(`http://localhost:8000/programs/`)
        setPName(
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
    
    const getallUsers = async () => {
      try{
        const response = await axios.get(`http://localhost:8000/login/`)
        setallUser(
          response.data.map((user)=>({
            "id":user.id,
            "username":user.username,
            "loginid":user.loginid,
            "password":user.password,
            "accessType":user.accessType
          }))
        )
      }catch(err){
        console.log(err)
      }
    }

    const getProgramAreas = async() => {
      try{  
        const response = await axios.get(`http://localhost:8000/programareas/${pAreaID}/`)
        setpArea(
          response.data.map((area) => ({
            aid:area.aid,
            pid:area.pid,
            areaName:area.areaName,
          }))
        )
      }catch(err){
        console.log(err);
      }
    }

    useEffect(()=>{
      if(user.username === null){
        history("/");
      } 
      const interval = setInterval(()=>{
        getallUsers();
        getProgramName();
      }, 2000)
      
      return () => clearInterval(interval);
      
    },[user.username])
  
    const addUser = async ()=>{
      if(userDetails.username === '' || userDetails.loginid === '' || userDetails.password === '' || userDetails.accessType === ''){
        alert("Please enter all details");
      }
      else{
        try{
          await axios.post(`http://localhost:8000/login/`,userDetails)
          setuserDetails({username :"", loginid:"", password:"", accessType:""})
        }catch(err){
          console.log(err);
        }
      }
    }

    const logoutUser = () => {
      localStorage.setItem('userDetails', JSON.stringify({username:null}));
      history("/");
    }

    const updateUserDetails = async() =>{
      try{
        const response = await axios.put(`http://localhost:8000/login/${updateUser.id}/`, updateUser);
        alert("Updated Successfully!!");
        setUpdateUser({id:"",username :"", loginid:"", password:"", accessType:""})
      }catch(err){
      console.log(err)
      }
    }

    const updateProgramDetails = async() => {
      try{
        const response = await axios.put(`http://localhost:8000/programs/${updateProgram.pid}/`, updateProgram);
        alert("Updated Successfully!!");
        setUpdateProgram({pid:"", programName:"", version:"", release:""})
      }catch(err){
      console.log(err)
      }
    }

    const updatePArea = async ({aid, pid}) => {
      try{
        let area = prompt("Enter New Program Area Name");
        if(area === "")
          alert("Try Again!!");
        else{
          const response = axios.put(`http://localhost:8000/programareas/${pid}/${aid}/`,{
            areaName:area
          })
          alert("Updated Successfully!!");
          getProgramAreas(aid);
        }
      }catch(err){
        console.log(err);
      }
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProgram((prevProgram) => ({
          ...prevProgram,
          [name]: value,
      }));
    };

    const handleInputChangeU = (e) => {
      const { name, value } = e.target;
      setuserDetails((prevUser) => ({
          ...prevUser,
          [name]: value,
      }));
    };

    const handleDelete = async (id) =>{
      console.log(id)
      try{
        const response = await axios.delete(`http://localhost:8000/login/${id}/`)
        alert("Deleted Successfully");
      }catch(err){
        console.log(err);
      }
    }

    const handleDeleteProgram = async (id) =>{
      console.log(id)
      try{
        const response = await axios.delete(`http://localhost:8000/programs/${id}/`)
        alert("Deleted Successfully");
      }catch(err){
        console.log(err);
      }
    }
 
    const addProgram = ()=>{
      if(program.programName === "")
        alert("Please enter Program Name");
      else{
        try{
          const response = axios.post(`http://localhost:8000/programs/`,program)
          alert("Program added successfully");
          setShowProgram(false);
        }catch(error){
          console.log(error);
        }
      }
    }

    const handleAddField = () => {
      const newField = { id: nextId, value: '' };
      setNextId(nextId + 1); 
      setFields([...fields, newField]);
    };

    const handleInputChangeAreas = (id, value) => {
      const updatedFields = fields.map((field) =>
          field.id === id ? { ...field, value } : field
      );
      setFields(updatedFields);
    };

    const addProgramAreas = async () => {

      if(user.username === "Darsh"){
        alert("You don't permission!!")
      }
      else{
        fields.forEach((field)=>{
            if(field.value === ""){
              alert("Please Enter Program Area");
            }
            else{
              axios.post(`http://localhost:8000/programareas/`, {
                  "pid":pid,
                  "areaName":field.value,
              })
            }
        })
      }
    }

    const getPid =  async (e) => {
      try{

        const response = await axios.get(`http://localhost:8000/programs/${selectProgram}/${selectVersion}/${e.target.value}/`)
        setpid(response.data[0].pid);

      }catch(err){
        console.log(err);
      }
    };

    const getVersion = async(e) =>{
        try{
          const encodedValue = encodeURIComponent(e.target.value);
          setSelectProgram(encodedValue);
          const response = await axios.get(`http://localhost:8000/programs/${encodedValue}/`)
          setVersion(
              response.data.map(version=>({
                value:version.version
              }))
          ) 
        }catch(err){
          console.log(err);
        }
    }

    const getRelease = async(e) =>{
      setSelectVersion(e.target.value);
      try{
        const response = await axios.get(`http://localhost:8000/programs/${selectProgram}/${e.target.value}/`)
        setRelease(
          response.data.map(release=>({
            value:release.release
          }))
        )
      }catch(err){
        console.log(err);
      }
  }

    const exportUser = async () =>{
      const currentDate = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
      const textContent = `Current Time: ${currentDate}\n` + allUsers.map(user => `${user.id} | ${user.username} | ${user.loginid} | ${user.password} | ${user.accessType}`).join('\n');
      const element = document.createElement('a');
      const file = new Blob([textContent], { type: 'text/plain' });

      element.href = URL.createObjectURL(file);
      element.download = 'employees.txt';
      document.body.appendChild(element); // Append the element to the DOM
      element.click();
      document.body.removeChild(element);
    }

    const exportAreas = async  () =>{
      const currentDate = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
      const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
        <areas>
        <exportDateTime>${currentDate}</exportDateTime>
        ${pArea.map(area => `
          <area>
            <aid>${area.aid}</aid>
            <pid>${area.pid}</pid>
            <areaName>${area.areaName}</areaName>
          </area>`).join('\n')}
        </areas>`;

          const element = document.createElement('a');
          const file = new Blob([xmlContent], { type: 'application/xml' });

          element.href = URL.createObjectURL(file);
          element.download = 'areas.xml';
          document.body.appendChild(element); // Append the element to the DOM
          element.click();
          document.body.removeChild(element);
    }
    return (
      <>
          <div>
            <button onClick={logoutUser}>Logout</button>
          </div>

          <div>
            <button onClick={() => setShowUser(true)}>Add User</button>
          </div>

          {showUser &&
            <div className='userCard'>
              <div className='pCardBody'>

                <CloseIcon onClick={()=>setShowUser(false)}/>

                <div>
                  <div> Enter User Name : </div>
                  <input 
                  name='username'
                  type='text' 
                  placeholder='Enter User name here' 
                  onChange={handleInputChangeU}
                  />
                </div>

                <div>
                  <div> Enter User ID : </div>
                  <input 
                  name='loginid'
                  type='text' 
                  placeholder='Enter user id here' 
                  onChange={handleInputChangeU}
                  />

                </div>

                <div>
                  <div> Enter Password : </div>

                  <input 
                  name='password'
                  type='password' 
                  placeholder='Enter password here' 
                  onChange={handleInputChangeU}
                  />
                </div>

                <div>
                  <div> Select Access Type : </div>
                  <select name= "accessType" className='accessType' onChange={handleInputChangeU}>
                    <option value="">select access type</option>
                    <option value="3">Admin</option>
                    <option value="2">Tester</option>
                    <option value="1">User</option>
                  </select>
                </div>
                
                <button onClick={addUser}>Add User</button>
                
              </div>
            </div>
          }
          <div>
            <button onClick={()=> setShowProgram(true)}>Add Programs</button>
          </div>

          {
            showProgram &&

            <div className='programsCard'>
              <div className='pCardBody'>

                <CloseIcon onClick={()=>setShowProgram(false)}/>

                <div>
                  <div> Enter Program Name : </div>
                  <input 
                  name='programName'
                  type='text' 
                  placeholder='Enter program name here' 
                  onChange={handleInputChange}
                  />
                </div>

                <div>
                  <div> Enter Program Version : </div>
                  <input 
                  name='version'
                  type='text' 
                  placeholder='Enter program version here' 
                  onChange={handleInputChange}
                  />

                </div>

                <div>
                  <div> Enter Program Release : </div>
                  <input 
                  name='release'
                  type='text' 
                  placeholder='Enter program release here' 
                  onChange={handleInputChange}
                  />
                </div>
                
                <button onClick={addProgram}>Add Program</button>
                
              </div>
            </div>
          }

          <div>
            <button onClick={()=>setShowProgramArea(true)}>Add Program Areas</button>
          </div>

          {
            showProgramArea &&

            <div className='programsAreaCard'>
              <div className='paCardBody'>

                <CloseIcon onClick={()=>{setShowProgramArea(false); setFields([{ id: 1, value: '' }])}}/>

                <div>
                  Program Name : 
                  <select onChange={getVersion}>
                    <option value ="">Select the Program</option>
                    {
                      pName.map(program=>(
                        <option value={program.programName}>{program.programName}</option>
                      ))
                    }
                  </select>
                </div>

                <div>
                  Version Number :
                  <select onChange={getRelease}>
                    <option value ="">Select the Version</option>
                    {
                      version.map(version => (
                        <option value={version.value}>{version.value}</option>
                      ))
                    }
                  </select>
                </div>

                <div>
                  Release Number :
                  <select onChange={getPid}>
                    <option value ="">Select the Version</option>
                    {
                      release.map(release => (
                        <option value={release.value}>{release.value}</option>
                      ))
                    }
                  </select>
                </div>

                <div className='areaInput'>
                  Enter Program Area(s) : 
                  {fields.map((field) => (
                      <div key={field.id}>
                          <input
                              type="text"
                              value={field.value}
                              onChange={(e) => handleInputChangeAreas(field.id, e.target.value)}
                          />
                      </div>
                  ))}
                </div>

                <button className="addFields" onClick={handleAddField}>Add Area</button>

                <button className="addAll" onClick={addProgramAreas}>Add</button>
            
              </div>
            </div>
          }

          <div>
            <button onClick={exportUser}>Export</button>
          </div>

          <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>UserID</th>
                        <th>Password</th>
                        <th>AcessType</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.loginid}</td>
                            <td>{user.password}</td>
                            <td>{user.accessType}</td>
                            <td>
                                <button onClick={() => setUpdateUser(user)} >Update</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          <hr/>

          { updateUser.id !== '' &&
            <div className='userCard'>
              <div className='pCardBody'>

                <CloseIcon onClick={()=>setUpdateUser({id:"",username :"", loginid:"", password:"", accessType:""})}/>

                <div>
                  <div> Enter User Name : </div>
                  <input 
                  name='username'
                  type='text'
                  value={updateUser?.username} 
                  placeholder='Enter User name here' 
                  onChange={(e) => setUpdateUser({...updateUser, username:e.target.value})}
                  />
                </div>

                <div>
                  <div> Enter User ID : </div>
                  <input 
                  name='loginid'
                  type='text' 
                  value={updateUser?.loginid}
                  placeholder='Enter user id here' 
                  
                  />

                </div>

                <div>
                  <div> Enter Password : </div>

                  <input 
                  name='password'
                  type='password'
                  value={updateUser?.password}
                  placeholder='Enter password here' 
                  onChange={(e) => setUpdateUser({...updateUser, password:e.target.value})}
                  />
                </div>

                <div>
                  <div> Select Access Type : </div>
                  <select value = {updateUser?.accessType} name= "accessType" className='accessType' onChange={(e) => setUpdateUser({...updateUser, accessType:e.target.value})}>
                    <option value="">select access type</option>
                    <option value="3">Admin</option>
                    <option value="2">Tester</option>
                    <option value="1">User</option>
                  </select>
                </div>
                
                <button onClick={updateUserDetails}>Update User</button>
                
              </div>
            </div>
          }

          <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Program Name</th>
                        <th>Version</th>
                        <th>Release</th>
                    </tr>
                </thead>
                <tbody>
                    {pName.map(program => (
                        <tr key={program.pid}>
                            <td>{program.programName}</td>
                            <td>{program.version}</td>
                            <td>{program.release}</td>
                            <td>
                                <button onClick={() => setUpdateProgram(program)} >Update</button>
                                <button onClick={() => handleDeleteProgram(program.pid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          <hr/>

          { updateProgram.pid !== '' &&
            <div className='userCard'>
              <div className='pCardBody'>

                <CloseIcon onClick={()=>setUpdateProgram({pid:"", programName:"", version:"", release:""})}/>

                <div>
                  <div> Enter Program Name : </div>
                  <input 
                  name='programName'
                  type='text'
                  value={updateProgram?.programName} 
                  placeholder='Enter Program name here' 
                  onChange={(e) => setUpdateProgram({...updateProgram, programName:e.target.value})}
                  />
                </div>

                <div>
                  <div> Version : </div>
                  <input 
                  name='version'
                  type='text' 
                  value={updateProgram?.version}
                  placeholder='version ' 
                  />

                </div>

                <div>
                  <div> Release : </div>

                  <input 
                  name='release'
                  type='text'
                  value={updateProgram?.release}
                  placeholder='release'
                  />
                </div>
                
                <button onClick={updateProgramDetails}>Update</button>
                
              </div>
            </div>
          }

          <hr/>

          <div>
            <div> Select a Program</div>
            <select name="" onChange={(e)=>setpAreaID(e.target.value)}>
              <option value="">Select a Program</option>
              {
                pName.map(program=>(
                  <option value={program.pid}>{program.programName}</option>
                ))
              }
            </select>
          </div>

          <div>
            <button onClick={getProgramAreas}>Get Program Area(s)</button>
          </div>

          <div>
            {
              pArea.map((area)=>(
                <div style={{display:'flex', padding:'5px'}}>
                  <div>{area.areaName}</div>
                  <button onClick={() => {updatePArea({aid : area.aid, pid : area.pid})}}>Update</button>
                  
                </div>
              ))
            }
          </div>

          <div>
            <button onClick={exportAreas}>Export</button>
          </div>
      </>
    );
  }

  export default Home;