import react, { useEffect } from "react";
import $ from "jquery";
import { cimg, cuid } from "./Featureside";
import gsap from "gsap";
import axios from "axios";
import surl from "..";
import { userid } from "../userdetails/Login";
import { setContact } from "./MainWindow";
axios.defaults.withCredentials = true;
function Contects(param) {
    function contactlog() {

        cuid(param.uid);
        cimg(param.img);
        $(".chatwindow").addClass(`chatwindow_${param.uid}`);
        $(".chatwindow").css({ "visibility": "visible" });
        $(".mainaidiv").css({ "visibility": "hidden" });



        gsap.from(".chatwindow", {
            duration: 0.5,
            scale: 0,
            opacity: 0
        });

        axios.post(`${surl}/updateprofile`, { user1: userid, user2: param.uid }).then((resp) => {
            if (resp.data != undefined) {
                setContact(resp.data);
            }

        });
        document.querySelector(`.chatwindow_${param.uid} #inputchatfield`).focus();
        axios.post(`${surl}/getchatdata`, { user1: userid, user2: param.uid }).then((resp) => {
            const msg = resp.data;
            // console.log(msg);
            for (var i = 0; i <= msg.length - 1; i++) {
                if (msg[i].userid == userid) {
                    if (!(msg[i].msg.startsWith("cloudimage:"))) {
                        var nele = document.createElement("div");
                        var np = document.createElement("p");
                        np.textContent = msg[i].msg;
                        nele.appendChild(np);
                        nele.setAttribute("class", "messagediv");
                        document.querySelector(`.chatwindow_${param.uid} #msgbox`).appendChild(nele);
                    }
                    else {
                        var msgi = msg[i].msg.slice(11)
                        var nele = document.createElement("div");
                        var np = document.createElement("img");
                        np.setAttribute("src", msgi);
                        np.setAttribute("alt", "image")
                        nele.appendChild(np);
                        np.setAttribute("class","photoimageimg");
                       nele.setAttribute("class", "photodiv");
                        nele.classList.add("messagediv");
                        document.querySelector(`.chatwindow_${param.uid} #msgbox`).appendChild(nele);
                    }

                }
                else {
                    if (!(msg[i].msg.startsWith("cloudimage:"))) {
                        var nele = document.createElement("div");
                        var np = document.createElement("p");
                        np.textContent = msg[i].msg;
                        nele.appendChild(np);
                        nele.setAttribute("class", "messagedivrec");
                        document.querySelector(`.chatwindow_${param.uid} #msgbox`).appendChild(nele);
                    }
                    else {
                        var msgi = msg[i].msg.slice(11)
                        var nele = document.createElement("div");
                        var np = document.createElement("img");
                        np.setAttribute("src", msgi);
                        np.setAttribute("alt", "image")
                        nele.appendChild(np);
                        np.setAttribute("class","photoimageimg");
                       nele.setAttribute("class", "photodiv");
                        nele.classList.add("messagedivrec");
                        document.querySelector(`.chatwindow_${param.uid} #msgbox`).appendChild(nele);
                    }

                }

            }
            $("#msgbox").animate({ scrollTop: $("#msgbox").prop("scrollHeight") }, 500);

        });

        axios.get(`${surl}/isdeleted?userid=${param.uid}`).then((x) => {
            if (x.data == "yes") {
                var nele = document.createElement("div");
                var np = document.createElement("p");
                np.textContent = "This Account Has Been Removed Or Deleted By The Account Holder!";
                nele.appendChild(np);
                nele.setAttribute("class", "deletedaccount");
                document.querySelector(`.chatwindow_${param.uid} #msgbox`).appendChild(nele);
            }
        });

        $("#msgbox").animate({ scrollTop: $("#msgbox").prop("scrollHeight") }, 500);

    }

    return (
        <div onClick={contactlog} className="contectdiv" style={{ backgroundColor: "gray", padding: "10px", marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "left", position: "relative" }}>
            <figure style={{ width: "90px", display: "inline-block", marginRight: "20px" }}>
                <img src={param.img} style={{ width: "100%", borderRadius: "50%" }} alt="profile" />
            </figure>
            <h3 style={{ display: "inline-block", fontWeight: "600" }}>
                {
                    (param.uid.length <= 15) ? param.uid : param.uid.slice(0, 11) + "...."
                }
            </h3>
            {
                param.newmsg > 0 ? <div className="newmsgind" style={{ backgroundColor: "red", position: "absolute", right: 20, top: 45, width: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "25%", fontWeight: 600, fontSize: "108%" }}>
                    {
                        (param.newmsg > 9) ? "9+" : param.newmsg
                    }
                </div> : null
            }
        </div>
    );
}
export default Contects;
