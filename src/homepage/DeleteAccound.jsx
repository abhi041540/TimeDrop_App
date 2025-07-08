import axios from "axios";
import React from "react";
import surl from "..";
import { userid } from "../userdetails/Login";
import { useNavigate } from "react-router-dom";
function DeleteAccount()
{
    var nav=useNavigate();
    function ocw()
        {
          axios.get(`${surl}/deleteaccount?userid=${userid}`).then((resp)=>{
            alert(resp.data);
            nav("/");
          });
        }
        return(
       <div style={{background:"gray",padding:"4px",display:"flex",alignItems:"center",justifyContent:"left",marginBottom:"20px"}}>
          <button onClick={ocw} className="addcontectbtn" style={{width:"100%"}}><h3 style={{fontSize:"115%",marginLeft:"10px",marginTop:"10px"}}><i className="ion-close-circled" style={{marginRight:"10px"}}/>Delete Account</h3></button> 
       </div>
        );
}
export default DeleteAccount;