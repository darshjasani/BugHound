import React from 'react'
import './Report.css'
function Report() {
 return (
    <>
        <h1 className='title'>New Bug Report Entry Page</h1>
        <form>
           <div className='partOne'>
                <div>Program :&nbsp;
                    <select>
                        <option>COBOL Coder V2</option>
                        <option>VSCode</option>
                        <option>NetBeans V10.2</option>
                        <option>Sublime</option>
                        <option>MySQL Server</option>
                    </select>
                </div>
                <div>Report Type :&nbsp;
                    <select>
                        <option>Coding Error</option>
                        <option>Design Issue</option>
                        <option>Suggestion</option>
                        <option>Documentation</option>
                        <option>Hardware</option>
                        <option>Query</option>
                    </select>
                </div>
                <div>Severity :&nbsp;
                    <select>
                        <option>Minor</option>
                        <option>Serious</option>
                        <option>Fatal</option>
                    </select>
                </div>
                
           </div> 

           <div className='partTwo'>
                <div>
                    Problem Summary :&nbsp; 
                    <input type='text' className='summary' placeholder='Enter a brief summary here '/> &nbsp;

                    Reproducible : 
                    <input type='checkbox' className='check' />
                </div>
           </div>

           <div className='partThree'>
                <div>
                    Problem : &nbsp;
                    <textarea placeholder='Enter the Problem'/>
                </div>
           </div>

           <div className='partFour'>
                <div>
                    Suggested Fix : &nbsp;
                    <textarea placeholder='Enter the Suggestion'/>
                </div>
           </div>

           <div className='partFive'>
                <div>
                    Reported By :&nbsp;
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
                    <input type='date'/>
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
                    <input type='date'/>
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
                    <input type='date'/>
                </div>   
                <div>
                    Treat as Deferred? :&nbsp;
                    <input type='checkbox'/>
                </div>
           </div>

           <div className='buttons'>
               <div>
                    <button>Submit</button>
                    <button>Reset</button>
                    <button>Cancel</button>
               </div>
           </div>
        </form>
    </>
  )
}

export default Report;