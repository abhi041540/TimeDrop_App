import React from "react";
import $ from "jquery";
import axios from "axios";
import { userid } from "../userdetails/Login";
import surl from "..";
import { setContact } from "./MainWindow";
function RemovalWindow()
{
    function contectSearchForm(event)
    {
        event.preventDefault();
        const uid=event.target.elements["userid"].value;
        if(uid==userid)
        {
           alert("Kindly Provide A Valide UserId!")
        }
        else
        {
            axios.get(`${surl}/removeusercontact?user1=${userid}&user2=${uid}`).then((resp)=>{
            if(resp.data.contacts.length!=0)
            {
                setContact(resp.data.contacts);
            }
                alert(resp.data.msg);
             $(".contectremoval").css({"visibility":"hidden"});
                
        });
        }
        event.target.elements["userid"].value="";

        
    }
function ccw()
{
  $(".contectremoval").css({"visibility":"hidden"});
}

    return(<section className="contectremoval" style={{width:"100%",height:"100vh",zIndex:"200",position:"fixed",top:0,left:0,display:"flex",alignItems:"center",justifyContent:"center",visibility:"hidden"}}>
       <div class="container text-center" style={{width:"100%",alignItems:"center"}}>
      <div class="row" style={{padding:"30px"}}>
       
        <div class="col-sm-8"  style={{backgroundColor:"rgb(46, 46, 46)",minWidth:"300px",maxWidth:"700px",margin:"0 auto",minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid gray",borderRadius:"10px",boxShadow:"10px 10px 10px gray",position:"relative"}}>
            <div  onClick={ccw} className="contectsearchclose" style={{position:"absolute",top:"2%",right:"3%",textAlign:"center",border:"2px solid white",padding:"0px 6px",borderRadius:"5px"}}>
            <i className="ion-close-round"></i>
        </div>
            <form method="post" style={{textAlign:"center"}} onSubmit={contectSearchForm}>
       
        <div style={{fontFamily:"serif",fontWeight:500,wordSpacing:"3px",fontSize:"106%"}}>
            <label>Enter Userid To Delete Contact</label>
        </div>
        <div>
            <input type="text" name="userid" placeholder="Enter Userid Here" style={{padding:"5px"}} required/>
        </div>
        <div>
            <input type="submit" className="contectsearch" value="Delete"/>
        </div>
      </form>
        </div>
    </div>
    </div>
    </section>);

}
export default RemovalWindow;