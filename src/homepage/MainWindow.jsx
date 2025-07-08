import React, { useEffect, useRef, useState } from "react";
import Loder from "./Loder";
import AppLogo from "./AppLogo";
import { io } from "socket.io-client";
import surl from "..";
import { userid, vu } from "../userdetails/Login";
import axios from "axios";
import Featureside from "./Featureside";
import { useNavigate } from "react-router-dom";
import SearchNewContects from "./SearchNewContect";
import $ from "jquery";
import AvatarWindow from "./AvatarsWindow";
import RemovalWindow from "./RemovalWindow";
import Ai from "./Ai";
import Myqr from "./Myqr";
import { adduser_qr } from "./Adduser_qr";

let socket1, setContact;

function MainWindow() {
    const [contacts, setContacts] = useState([]);
    setContact = setContacts;
    const socket = useRef(null);
    const nav = useNavigate()
    useEffect(() => {

        if (vu != 1 || userid == "" || userid == undefined) {
            nav("/");
        }
        else {

            socket.current = io(surl, {
                transports: ["websocket", "polling"],
                withCredentials: true
            });
            socket1 = socket.current;

            axios.post(`${surl}/getcontects`, { userid: userid }).then((resp) => {
                if (resp.data.length == 0) {
                    setContacts([{}])
                }
                else {
                    setContacts(resp.data);
                }

            });

            socket.current.on("connect", () => {
                socket.current.emit("add_socketid_userid", userid)
            });

            socket.current.on("recievemsg", (x) => {
                if (x.contacts != undefined) {
                    setContacts(x.contacts);
                }
                else {
                    console.log(x.contacts);
                }
                var chk = $(".chatwindow").hasClass(`chatwindow_${x.user2}`)
                if (chk == true) {
                    if (!(x.msg.startsWith("cloudimage:"))) {
                        var nele = document.createElement("div");
                        var np = document.createElement("p");
                        np.textContent = x.msg;
                        nele.appendChild(np);
                        nele.setAttribute("class", "messagedivrec");
                        document.querySelector(`.chatwindow_${x.user2} #msgbox`).appendChild(nele);
                        $("#msgbox").animate({ scrollTop: $("#msgbox").prop("scrollHeight") });
                    }
                    else {
                        var msg = x.msg.slice(11);
                        var nele = document.createElement("div");
                        var np = document.createElement("img");
                        np.setAttribute("src",msg);
                        np.setAttribute("alt", "image")
                        nele.appendChild(np);
                        np.setAttribute("class","photoimageimg");
                        nele.setAttribute("class", "photodiv");
                        nele.classList.add("messagedivrec");
                        document.querySelector(`.chatwindow_${x.user2} #msgbox`).appendChild(nele);
                        $("#msgbox").animate({ scrollTop: $("#msgbox").prop("scrollHeight") });

                    }
                }

            });

            socket.current.on("connect_error", (err) => {
                console.error("Connection error:", err);
            });

        }
    }, []);

    useEffect(()=>{
        if(adduser_qr.length>0)
        {
             if(adduser_qr==userid)
        {
                 alert("You cannot add yourself as friend!");
        }
        else{
            axios.post(`${surl}/addcontect`,{userid1:userid,userid2:adduser_qr}).then((resp)=>{
                   alert(resp.data.msg);
                    if(resp.data.contects[0].userid)
                    {
                        setContact(resp.data.contects);
                    }

        });
        }
        }

    },[]);

    useEffect(() => {
        socket1 = socket.current;
    }, [socket.current]);

    if (contacts.length == 0) {
        return (
            <section className="mainwindow" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}>
                <div style={{ position: "fixed", width: "100%", zIndex: 100, top: 0, left: 0 }}>

                    <AppLogo />

                </div>
                <Loder />
            </section>
        );
    } else {
        return (
            <section className="mainwindow">
                <div className="mainaidiv" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: "20px", right: 30 }} >
                    <a href="https://intellivibeai.vercel.app/chat" target="_blank" style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", width: "40px", fontFamily: "serif", fontSize: "105%", fontWeight: "600", border: "1px solid white", padding: "5px", boxShadow: "5px 5px 5px black" }}>
                        <img src="../../logo_ai.png" alt="AI" id="aiimg" style={{ width: "100%" }} /></a>
                </div>
                <div className="applogomainwindow">
                    <AppLogo />
                </div>
                <Featureside contects={contacts} />
                <SearchNewContects />
                <AvatarWindow />
                <RemovalWindow />
                 <Myqr/>
            </section>
        );
    }
}

export default MainWindow;
export { socket1, setContact };
