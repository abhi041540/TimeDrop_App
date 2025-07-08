import react, { useState } from "react";
import { userid } from "../userdetails/Login";
import { P_pic } from "../P_pic";
import axios from "axios";
import surl from "..";
var setIconProfile=null;
function ProfileImage()
{
    var[icon,setIcon]=useState(1);
    setIconProfile=setIcon;
    axios.post(`${surl}/iconimage`,{userid:userid}).then((resp)=>{
         setIcon(resp.data);
    });
    
    return(
        <section>
           <div style={{textAlign:"center"}}>
            <figure style={{width:"120px",margin:"10px auto"}}>
                <img src={P_pic[icon]} alt="p_pic" style={{width:"100%",borderRadius:"50%"}}/>
            </figure>
            <h3 style={{fontFamily:"serif",fontSize:"180%",fontWeight:"500"}}>{userid.length>10 ? userid.slice(0,8)+"...":userid}</h3>
           </div>
        </section>
    );
};
export default ProfileImage;
export{setIconProfile};