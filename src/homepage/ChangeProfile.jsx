import React from "react";
import $ from "jquery";
function ChangeProfile()
{
    function ocw()
    {
      $(".AvatarWindow").css({"visibility":"visible"});
    }
    return(
   <div style={{background:"gray",padding:"4px",display:"flex",alignItems:"center",justifyContent:"left",marginBottom:"20px"}}>
      <button onClick={ocw} className="addcontectbtn" style={{width:"100%"}}><h3 style={{fontSize:"115%",marginLeft:"10px",marginTop:"10px"}}><i className="ion-social-octocat" style={{marginRight:"10px"}}/>Profile Avatars</h3></button> 
   </div>
    );
};
export default ChangeProfile;