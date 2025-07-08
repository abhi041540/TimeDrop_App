import React, { useEffect, useState } from "react";
import $ from "jquery";
import { setContact, socket1 } from "./MainWindow";
import { userid } from "../userdetails/Login";
import EmojiPicker from 'emoji-picker-react';
import axios from "axios";
import surl from "..";
import Ai from "./Ai";
axios.defaults.withCredentials = true;
var cloud=process.env.CLOUD;
function ChatWindow(param) {
    var [inputtextmsg, setmsg] = useState("");
    var [st,sst]=useState(0);
    var [emojistate, setemojistate] = useState(0);
    function ccw() {

        setemojistate(0);
        $(".chatwindow").css({ "visibility": "hidden" });
        $(".mainaidiv").css({ "visibility": "visible" });
        $(`.chatwindow_${param.uid} #msgbox .messagediv`).remove();
        $(`.chatwindow_${param.uid} #msgbox .messagedivrec`).remove();
        $(`.chatwindow_${param.uid} #msgbox .deletedaccount`).remove();
        $(".chatwindow").removeClass(`chatwindow_${param.uid}`);

        axios.post(`${surl}/readscriptzero`, { user1: userid, user2: param.uid }).then((x) => {
            if (x.data.length != 0) {
                // console.log(x.data);
                setContact(x.data);
            }

        });


    }
    function inputmsg(event) {

        setmsg(event.target.value);
    }
    function emojiadd(x) {
        setmsg($("#inputchatfield").attr("value") + x.emoji);
    }
    function emojisection() {
        if (emojistate == 0) {
            setemojistate(1);
        }
        else {
            setemojistate(0);
        }

    }
    function unfocusemojibox() {
        setemojistate(0);
    }

    function sendmsg(event) {
        event.preventDefault();
        sendmsg = event.target.elements["msgtxt"].value;
        socket1.emit("sendmsg", { user1: userid, user2: param.uid, msg: sendmsg });

        var nele = document.createElement("div");
        var np = document.createElement("p");
        np.textContent = sendmsg
        nele.appendChild(np);
        nele.setAttribute("class", "messagediv");
        document.querySelector(`.chatwindow_${param.uid} #msgbox`).appendChild(nele);
        $("#msgbox").animate({ scrollTop: $("#msgbox").prop("scrollHeight") });

        event.target.elements["msgtxt"].value = "";
        setmsg("");
    }

    function imagebtnclicked() {
        document.getElementById("inputfileimage").click();
    }

    function fileselection(event) {
        var file = event.target.files;
        if (file.length != 0 && file != undefined) {
            if (file[0].type.startsWith('image/')) {

                if ((file[0].size / (1024 * 1024)) > 2) {
                    alert("Please select image under 2MB size range!");
                }
                else {
                    const formData = new FormData();
                    formData.append('file', file[0]);
                    formData.append('upload_preset', 'TimeDrop');
                    formData.append('cloud_name', cloud);

                    axios.post("https://api.cloudinary.com/v1_1/"+cloud+"/image/upload", formData, { withCredentials: false }).then((resp) => {
                        // console.log(resp.data["secure_url"]);

                        socket1.emit("sendmsg", { user1: userid, user2: param.uid, msg: `cloudimage:${resp.data["secure_url"]}`});
                        var nele = document.createElement("div");
                        var np = document.createElement("img");
                        np.setAttribute("src",resp.data["secure_url"]);
                        np.setAttribute("alt","image")
                        nele.appendChild(np);
                        np.setAttribute("class","photoimageimg");
                        nele.setAttribute("class", "photodiv");
                        nele.classList.add("messagediv");
                        document.querySelector(`.chatwindow_${param.uid} #msgbox`).appendChild(nele);
                        $("#msgbox").animate({ scrollTop: $("#msgbox").prop("scrollHeight") });
                        sst(1);

                    });
                }
            }
            else {
                alert('Please select a valid image file (jpg, png, etc.)');
            }
        }
    }

          $(".photoimageimg").on("click",(e)=>{
          $("#bitphotoimg").attr("href",$(e.target).attr("src"));
          document.getElementById("bitphotoimg").click();
        });

    

    return (
        <section className="chatwindow" style={{ width: "100%", height: "100vh", position: "fixed", top: 0, left: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", overflow: "auto" }}>
            <a href="#" target="_blank" style={{visibility:"hidden",position:"absolute"}} id="bitphotoimg"></a>
            <div class="container text-center" style={{ background: "linear-gradient(145deg,rgb(0, 0, 0),rgb(88, 88, 88))", minHeight: "85vh", overflow: "auto", position: "relative" }}>
                <div class="row" style={{ position: "absolute", top: 0, left: 15, right: 15 }}>
                    <div class="col-12" style={{ padding: "0", position: "relative" }}>
                        <div style={{ color: "white", backgroundColor: "gray", textAlign: "left", width: "100%", padding: "5px", zIndex: "600" }}>
                            <img style={{ width: "70px", borderRadius: "50%", margin: "0 8px 0 5px" }} src={param.img ? param.img : ""} alt="profile" />
                            <h4 style={{ display: "inline-block", fontFamily: "revert-layer", fontWeight: "600" }}>
                                {
                                    (param.uid.length <= 15) ? param.uid : param.uid.slice(0, 11) + "...."
                                }
                            </h4>
                            <Ai right={55} />
                            <div onClick={ccw} className="contectsearchclose" style={{ position: "absolute", top: "10px", right: "10px", textAlign: "center", border: "2px solid white", padding: "0px 6px", borderRadius: "5px" }}>
                                <i className="ion-close-round"></i>
                            </div>
                        </div>

                    </div>
                </div>

                {
                    <div id="msgbox" style={{ position: "absolute", top: "100px", left: 15, right: 15, bottom: 60, overflow: "auto", scrollbarWidth: "none" }}>
                        {/* ----------------------------------------- */}

                    </div>

                }

                <div className="chatmsg" style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", zIndex: "600" }}>
                    <div
                        id="emojipicker"
                        style={{
                            position: "absolute",
                            bottom: "90%",
                            left: "12%",
                            transition: "opacity 0.3s ease, transform 0.3s ease",
                            opacity: emojistate === 1 ? 1 : 0,
                            transform: emojistate === 1 ? "translateY(0)" : "translateY(10px)",
                            pointerEvents: emojistate === 1 ? "auto" : "none",
                            zIndex: 1500,
                        }}
                    >
                        <EmojiPicker onEmojiClick={emojiadd} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <input type="file" accept="image/*" name="image" id="inputfileimage" onChange={fileselection} style={{ visibility: "hidden", position: "absolute" }} />
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <button id="imagebtn" onClick={imagebtnclicked} style={{ padding: "2px 5px", fontSize: "120%", marginRight: "5px", display: "inline-block" }}><i className="ion-images"></i></button>
                            <button id="emojibtn_cw" onClick={emojisection} style={{ padding: "2px 5px", fontSize: "120%", marginRight: "5px", display: "inline-block" }}><i className="ion-happy-outline"></i></button>
                            <form method="post" onSubmit={sendmsg} style={{ zIndex: "500", display: "inline-block" }}>
                                <input onFocus={unfocusemojibox} onChange={inputmsg} style={{ padding: "5px", borderRadius: "5px", marginRight: "5px", width: "50vw", maxWidth: "350px" }} id="inputchatfield" type="text" name="msgtxt" placeholder="Enter Here!" required value={inputtextmsg} />
                                <button id="chatmsgsendbtn" style={{ padding: "2px 5px", fontSize: "120%" }} type="submit"><i className="ion-android-send"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ChatWindow;