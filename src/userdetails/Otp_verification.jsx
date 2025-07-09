import react, { useState } from "react";
import $ from "jquery"
function Otp_verification() {
    var [otp, setotp] = useState("");
    function otpchange(event) {
        setotp(event.target.value);
    }
    function ccw() {
        $(".otpverification").css({ "visibility": "hidden" });
        document.getElementById("otpinput").value="";
    }
    return (
        <div className="otpverification" style={{ width: "100%", height: "100vh", position: "fixed", display: "flex", alignItems: "center", justifyContent: "center", visibility: "hidden",zIndex:"500"}} >
            <form method="post" style={{ backgroundColor: "black", maxWidth: "300px", textAlign: "center", padding: "20px", borderRadius: "10px", border: "1px solid gray",position:"relative" }}>
                <div onClick={ccw} className="contectsearchclose" style={{ position: "absolute", top: "4%", textAlign: "center", border: "2px solid white", padding: "0px 6px", borderRadius: "5px",width:"40px", right: "3%" }}>
                    <i className="ion-close-round"></i>
                </div>
                <div style={{ fontWeight: "500", fontFamily: "serif", marginBottom: "10px" }}>
                    <label >Email OTP</label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <input type="password" id="otpinput" name="otp" placeholder="Enter OTP Here" value={otp} onChange={otpchange} required style={{ padding: "5px", borderRadius: "5px" }} />
                </div>
                <div>
                    <input type="submit" value="Submit" className="otp_submit" />
                </div>
            </form>
        </div>
    );
};
export default Otp_verification;