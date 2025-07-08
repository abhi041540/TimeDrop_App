import React from "react";
import $ from "jquery";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
function Myqrbtn()
{
    function ocw()
    {
         $(".qrcard").css({"visibility":"visible"});
        $(".myqr").css({"visibility":"visible"});
        $(".myqr-wrapper").css({"visibility":"visible"});
        gsap.from(".myqr",{
            duration:0.5,
            scale:0,
            opacity:0
        })
    }
    return(
   <div style={{background:"gray",padding:"4px",display:"flex",alignItems:"center",justifyContent:"left",marginBottom:"20px"}}>
      <button onClick={ocw} className="addcontectbtn" style={{width:"100%"}}><h3 style={{fontSize:"115%",marginLeft:"10px",marginTop:"10px"}}><i className="ion-ios-barcode" style={{marginRight:"10px"}}/>QR Code</h3></button> 
   </div>
    );
};
export default Myqrbtn;