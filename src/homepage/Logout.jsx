import React from "react";
import { useNavigate } from "react-router-dom";
function Logout()
{
    const nav=useNavigate();
    function ocw()
        {
          nav("/");
        }
        return(
       <div style={{background:"gray",padding:"4px",display:"flex",alignItems:"center",justifyContent:"left",marginBottom:"20px"}}>
          <button onClick={ocw} className="addcontectbtn" style={{width:"100%"}}><h3 style={{fontSize:"115%",marginLeft:"10px",marginTop:"10px"}}><i className="ion-log-out" style={{marginRight:"10px"}}/>Logout</h3></button> 
       </div>
        );
    }
export default Logout;   