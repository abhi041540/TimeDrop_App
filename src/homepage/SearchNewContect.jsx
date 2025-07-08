import React from "react";
import $ from "jquery";
import axios from "axios";
import { userid } from "../userdetails/Login";
import surl from "..";
import { setContact } from "./MainWindow";
function SearchNewContects()
{
    function contectSearchForm(event)
    {
        event.preventDefault();
        if(event.target.elements["userid"].value==userid)
        {
                 alert("You cannot add yourself as friend!");
                   event.target.elements["userid"].value="";
        }
        else{
            axios.post(`${surl}/addcontect`,{userid1:userid,userid2:event.target.elements["userid"].value}).then((resp)=>{
                   alert(resp.data.msg);
                   event.target.elements["userid"].value="";
                    $(".SearchNewContect").css({"visibility":"hidden"});
                    if(resp.data.contects[0].userid)
                    {
                        setContact(resp.data.contects);
                    }

        });
        }
    }
function ccw()
{
  $(".SearchNewContect").css({"visibility":"hidden"});
}

    return(<section className="SearchNewContect" style={{width:"100%",height:"100vh",zIndex:"200",position:"fixed",top:0,left:0,display:"flex",alignItems:"center",justifyContent:"center",visibility:"hidden"}}>
       <div class="container text-center" style={{width:"100%",alignItems:"center"}}>
      <div class="row" style={{padding:"30px"}}>
       
        <div class="col-sm-8"  style={{backgroundColor:"rgb(46, 46, 46)",minWidth:"300px",maxWidth:"700px",margin:"0 auto",minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid gray",borderRadius:"10px",boxShadow:"10px 10px 10px gray",position:"relative"}}>
            <div  onClick={ccw} className="contectsearchclose" style={{position:"absolute",top:"2%",right:"3%",textAlign:"center",border:"2px solid white",padding:"0px 6px",borderRadius:"5px"}}>
            <i className="ion-close-round"></i>
        </div>
            <form method="post" style={{textAlign:"center"}} onSubmit={contectSearchForm}>
       
        <div style={{fontFamily:"serif",fontWeight:500,wordSpacing:"3px",fontSize:"106%"}}>
            <label>Enter Userid To Search/Add</label>
        </div>
        <div>
            <input type="text" name="userid" placeholder="Enter Userid Here" style={{padding:"5px"}} required/>
        </div>
        <div>
            <input type="submit" className="contectsearch" value="Search/Add"/>
        </div>
      </form>
        </div>
    </div>
    </div>
    </section>);
};
export default SearchNewContects;