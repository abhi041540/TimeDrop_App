import React, { useEffect, useState } from "react";
import $ from "jquery";
import { P_pic } from "../P_pic";
import Contects from "./Contects.jsx";
import AddContrects from "./AddContects.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { socket1 } from "./MainWindow.jsx";
import ProfileImage from "./ProfileImage.jsx";
import ChangeProfile from "./ChangeProfile.jsx";
import Logout from "./Logout.jsx";
import RemoveContact from "./RemoveContact.jsx";
import DeleteAccount from "./DeleteAccound.jsx";
import Myqrbtn from "./Myqrbtn.jsx";
var cuid,cimg;
function Featureside(param) {
    const [showFeatures, setShowFeatures] = useState(false);
    var[csuid,scuid]=useState("")
    var[csimg,scimg]=useState("");
    cuid=scuid;
    cimg=scimg;
    useEffect(() => {
        if (showFeatures) {
            $(".mfd .fbtn").text("Hide Features");
        }
        else {
            $(".mfd .fbtn").text("Show Features");
        }
    }, [showFeatures]);
        
    function Sfclick() {
        setShowFeatures(!showFeatures);
    }

    return (
        <section>
            <div className="container-fluid">
                <div className="row mfd">

                    <button className="btn btn-primary d-md-none fbtn" onClick={Sfclick} style={{ marginTop: "10px", background: "linear-gradient(45deg,rgb(12, 12, 12),rgb(187, 186, 186))", border: "1px solid white" }}> <i className="ion-grid" style={{ color: "white", zIndex: 100, fontSize: "170%" }}></i>Show Features</button>
                    <div className={`col-md-3 order-md-1 bg-dark text-white ${showFeatures ? '' : 'd-none d-md-block'}`} style={{ height: "90vh", overflow: "auto", marginTop: "10px", borderRight: "1px solid gray",scrollbarColor:"transpatent transparent",scrollbarWidth:"none" }}>
                        <h2 style={{ fontFamily: "serif" }}>Features</h2>
                        <ProfileImage/>
                        <AddContrects/>
                        <ChangeProfile/>
                        <Myqrbtn/>
                        <RemoveContact/>
                        <DeleteAccount/>
                        <Logout/>
                     

                    </div>
                    {
                        (param.contects[0].userid) ? <div className="col-md-9 order-md-2" style={{ height: "90vh", overflow: "auto", marginTop: "10px" }}>
                            <h2 style={{ fontFamily: "serif" }}>Contacts</h2>
                            {
                                param.contects.map((x) => {
                                    return (<Contects img={P_pic[x.icon]} uid={x.userid} newmsg={x.newmsg} />)
                                })
                            }
                        </div> : <div className="col-md-9 order-md-2" style={{ height: "90vh", overflow: "auto", marginTop: "10px" }}>
                            <h2 style={{ fontFamily: "serif" }}>Contact</h2>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}>
                                <div style={{ textAlign: "center", color: "gray" }}>
                                    <i className="ion-sad" style={{ fontSize: "100px" }}></i>
                                    <h2 style={{ color: "gray" }}>No Contacts Available!</h2>
                                </div>
                            </div>
                        </div>
                    }
                    <ChatWindow img={csimg} uid={csuid}/>

                </div>
            </div>
        </section>
    );
};
export default Featureside;
export{cimg,cuid};