import React from "react";
import $ from "jquery";
function RemoveContact()
{
   function ocw()
        {
           alert("Are you Sure...?\nif you delete the contact all the chat will be removed at your side and cannot be backup further!");
           $(".contectremoval").css({"visibility":"visible"});
        }
        return(
       <div style={{background:"gray",padding:"4px",display:"flex",alignItems:"center",justifyContent:"left",marginBottom:"20px"}}>
          <button onClick={ocw} className="addcontectbtn" style={{width:"100%"}}><h3 style={{fontSize:"115%",marginLeft:"10px",marginTop:"10px"}}><i className="ion-trash-a" style={{marginRight:"10px"}}/>Delete Contact</h3></button> 
       </div>
        );
};
export default RemoveContact;