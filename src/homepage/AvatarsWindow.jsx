import React, { useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import { userid } from "../userdetails/Login";
import surl from "..";
import { setContact } from "./MainWindow";
import { P_pic } from "../P_pic";
import { setIconProfile } from "./ProfileImage";
function AvatarWindow()
{
function ccw()
{
  $(".AvatarWindow").css({"visibility":"hidden"});
}
useEffect(()=>{

$(".AvatarWindow ul.avatarslist li").click(function(){
    var avt=$(this).attr("name");
    setIconProfile(avt);
    axios.post(`${surl}/updateicon`,{avatar:avt,userid:userid});
    alert("Profile Avatar Updated Successfully!")
});

},[])

    return(<section className="AvatarWindow" style={{width:"100%",height:"100vh",zIndex:"200",position:"fixed",top:0,left:0,display:"flex",alignItems:"center",justifyContent:"center",visibility:"hidden"}}>
       <div class="container text-center" style={{width:"100%",alignItems:"center"}}>
      <div class="row" style={{padding:"30px"}}>
       
        <div class="col-sm-8"  style={{backgroundColor:"rgb(46, 46, 46)",minWidth:"300px",maxWidth:"700px",margin:"0 auto",minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid gray",borderRadius:"10px",boxShadow:"10px 10px 10px gray",position:"relative"}}>
            <div  onClick={ccw} className="contectsearchclose" style={{position:"absolute",top:"2%",right:"3%",textAlign:"center",border:"2px solid white",padding:"0px 6px",borderRadius:"5px"}}>
            <i className="ion-close-round"></i>
        </div>
           <div>
             <h3 style={{paddingTop:"20px",fontFamily:"serif",fontWeight:"bold",width:"100%",textAlign:"center",paddingLeft:"0px"}}>Avatars</h3>
            <div style={{padding:"20px",margin:"40px",marginTop:0,scrollbarColor:"transparent transparent",scrollbarWidth:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
               <ul className="avatarslist" style={{listStyle:"none",padding:"20px",overflow:"auto",height:"430px"}}>
                <li name="1" style={{padding:"10px", width:"130px",display:"inline-block",margin:"5px", color:"transparent"}}><img style={{width:"100%"}} src={P_pic[1]} alt="Avatars" /></li>
                <li name="2" style={{padding:"10px", width:"130px",display:"inline-block",margin:"5px", color:"transparent"}}><img style={{width:"100%"}} src={P_pic[2]} alt="Avatars" /></li>
                <li name="3" style={{padding:"10px", width:"130px",display:"inline-block",margin:"5px", color:"transparent"}}><img style={{width:"100%"}} src={P_pic[3]} alt="Avatars" /></li>
                <li name="4" style={{padding:"10px", width:"130px",display:"inline-block",margin:"5px", color:"transparent"}}><img style={{width:"100%"}} src={P_pic[4]} alt="Avatars" /></li>
                <li name="5" style={{padding:"10px", width:"130px",display:"inline-block",margin:"5px", color:"transparent"}}><img style={{width:"100%"}} src={P_pic[5]} alt="Avatars" /></li>
                <li name="6" style={{padding:"10px", width:"130px",display:"inline-block",margin:"5px", color:"transparent"}}><img style={{width:"100%"}} src={P_pic[6]} alt="Avatars" /></li>
                <li name="7" style={{padding:"10px", width:"130px",display:"inline-block",margin:"5px", color:"transparent"}}><img style={{width:"100%"}} src={P_pic[7]} alt="Avatars" /></li>
                <li name="8" style={{padding:"10px", width:"130px",display:"inline-block",margin:"5px", color:"transparent"}}><img style={{width:"100%"}} src={P_pic[8]} alt="Avatars" /></li>
                <li name="9" style={{padding:"10px", width:"130px",display:"inline-block",margin:"5px", color:"transparent"}}><img style={{width:"100%"}} src={P_pic[9]} alt="Avatars" /></li>
               </ul>
            </div>
           </div>
        </div>
    </div>
    </div>
    </section>);
};
export default AvatarWindow;