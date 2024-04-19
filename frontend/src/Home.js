import axios from 'axios';
import React, { useEffect, useState, version }  from 'react';
import { useNavigate } from 'react-router-dom';
import Report  from './Report';
import './Home.css'
import CloseIcon from '@mui/icons-material/Close';
function Home() {

    const [showProgram, setShowProgram] = useState(false);
    const [showProgramArea, setShowProgramArea] = useState(false);
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('userDetails'));
    const [program, setProgram] = useState({programName :"", version:1, release:1});
    const [fields, setFields] = useState([{ id: 1, value: '' }]);
    const [nextId, setNextId] = useState(2); 
    const [pName, setPName] = useState([])
    const [version, setVersion] = useState([])
    const [release, setRelease] = useState([])
    const [selectProgram, setSelectProgram] = useState(null);
    const [selectVersion, setSelectVersion] = useState(1);
    const [pid, setpid] = useState(1);

    const getProgramName = async () =>{
      try{
        const response = await axios.get(`http://localhost:8000/programs/`)
        setPName(
          response.data.map((program)=>({
            "pid":program.pid,
            "pname":program.programName,
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

      getProgramName();
    },[user])
  
    
    const logoutUser = () => {
      localStorage.setItem('userDetails', JSON.stringify({username:null}));
      history("/");
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProgram((prevProgram) => ({
          ...prevProgram,
          [name]: value,
      }));
    };

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

    return (
      <>
          <div>
            <button onClick={logoutUser}>Logout</button>
          </div>

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
                        <option value={program.pname}>{program.pname}</option>
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
      </>
    );
  }

  export default Home;