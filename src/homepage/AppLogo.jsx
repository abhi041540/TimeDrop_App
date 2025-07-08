import React from "react";
function AppLogo()
{
    return(
         <div style={{width:"100%"}}>
                <img src="../images/logo_nb.png" alt="logo" style={{width:"60px",margin:"10px",float:"left"}} />
                <h1 style={{display:"block",fontSize:"160%",marginTop:"20px",float:"left"}}>
                    TimeDrop
                </h1>
                <div className="clearfix"></div>
         </div>
    );
};
export default AppLogo;