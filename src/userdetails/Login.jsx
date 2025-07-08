import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import surl from "..";
import { useNavigate, useSearchParams } from "react-router-dom";
axios.defaults.withCredentials = true;

let userid, vu = 0;
function Login() {
    var [userid1, setUserid] = useState("");

    useEffect(() => {
        userid = userid1;
    }, [userid1]);


    const nav = useNavigate();
    function inpborder(event) {
        $(event.target).css({ "box-shadow": "none" });
    }
    useEffect(() => {
        const container = document.getElementById("bubble-container");

        const createBubble = () => {
            const bubble = document.createElement("div");
            bubble.className = "bubble";
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.width = bubble.style.height = `${10 + Math.random() * 30}px`;
            container.appendChild(bubble);

            bubble.addEventListener("animationend", () => {
                container.removeChild(bubble);
            });
        };

        const interval = setInterval(createBubble, 800);

        return () => clearInterval(interval);
    }, []);

    function loginform(event) {
        event.preventDefault();
        var uid, password;
        uid = event.target.elements["userid"].value;
        password = event.target.elements["password"].value;
        if (!(password.length >= 8 && password.length <= 20)) {
            alert("Invalide User Identity!");
            event.target.elements["password"].value = "";
            event.target.elements["userid"].value = "";

        }
        else {
            axios.post(`${surl}/userlogin`, { userid: uid, password: password }).then((resp) => {
                if (resp.data != "accepted") {
                    event.target.elements["password"].value = "";
                    event.target.elements["userid"].value = "";
                    alert(resp.data);
                }
                else {
                    setUserid(uid);
                    event.target.elements["password"].value = "";
                    event.target.elements["userid"].value = "";
                    vu = 1;
                    nav("/timedrop/home");
                }
            });
        }
    }
    return (
        <section className="loginform">
            <div class="container text-center">
                <div class="row">
                    <div className="bubble-container" id="bubble-container" style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0, zIndex: "100" }}></div>
                    <div style={{ textAlign: "center" }} className="col">
                        <div style={{ textAlign: "center", minWidth: "300px", maxWidth: "600px", margin: "0 auto" }}>
                            <div>
                                <h1 style={{ fontFamily: "serif", fontWeight: 600, fontSize: "160%", zIndex: "200", position: "relative" }}>User Login</h1>
                            </div>
                            <form method="post" style={{ display: "block", zIndex: "200", position: "relative" }} onSubmit={loginform}>
                                <div class="mb-3">
                                    <label class="form-label">UserId</label>
                                    <input onFocus={inpborder} type="text" name="userid" class="form-control" placeholder="Enter UserId Here" required />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Password</label>
                                    <input onFocus={inpborder} type="password" name="password" class="form-control" placeholder="Enter Password Here" required />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <input type="submit" value="Confirm" />
                                    <button className="signup_login" id="lsignup" style={{ marginLeft: "20px" }}>Signup</button>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <a href="#" className="forgotpassword" id="forgotwindowbutton">forgot password</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};
export default Login;
export { userid, vu };