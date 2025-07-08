import React from "react";
import $ from "jquery"
function Ai(param)
{
  
    return(
        <a href="https://intellivibeai.vercel.app/chat" target="_blank" style={{display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",width:"40px",position:"absolute",top:"20px",fontFamily:"serif",fontSize:"105%",fontWeight:"600",right:param.right,border:"1px solid white",padding:"5px",boxShadow:"5px 5px 5px black"}}>
            <img src="../../logo_ai.png" alt="AI" id="aiimg" style={{width:"100%"}}/></a>

    );
};
export default Ai;