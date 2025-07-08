import React, { useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import surl from "..";
function Signup() {

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

    function signupform(event) {
        event.preventDefault();
        const userid = event.target.elements["userid"].value;
        const email = event.target.elements["email"].value;
        const password = event.target.elements["password"].value;
        if (!(password.length >= 8 && password.length <= 20)) {
            alert("password must be 8-20 character long!");
            event.target.elements["userid"].value = "";
            event.target.elements["email"].value = "";
            event.target.elements["password"].value = "";
        }
        else {
            const otp = `${Math.ceil(Math.random() * 9)}${Math.ceil(Math.random() * 9)}${Math.ceil(Math.random() * 9)}${Math.ceil(Math.random() * 9)}${Math.ceil(Math.random() * 9)}${Math.ceil(Math.random() * 9)}`;
            axios.post(`${surl}/usersignup`, { userid: userid, password: password, email: email, otp: otp }).then((resp) => {
              
                if (resp.data==="taken") {
                    alert("user identity is already taken!");
                    event.target.elements["userid"].value = "";
                    event.target.elements["email"].value = "";
                    event.target.elements["password"].value = "";
                }
                else if (resp.data === "Issuee") {
                    alert(`${"Issue In Sending Email!"} please try again later!`);
                    event.target.elements["userid"].value = "";
                    event.target.elements["email"].value = "";
                    event.target.elements["password"].value = "";
                      $(".otpverificatio").css({ "visibility": "hidden" });
                }
                else if (resp.data === "otp_sent") {
                    $(".otpverification form").on("submit", (event1) => {
                        event1.preventDefault();
                        const uotp = event1.target.elements["otp"].value;
                        if (uotp === otp) {
                            alert("Signup Successfully!");
                            event1.target.elements["otp"].value = "";
                            $(".otpverification").css({ "visibility": "hidden" });
                            event.target.elements["userid"].value = "";
                            event.target.elements["email"].value = "";
                            event.target.elements["password"].value = "";
                            axios.post(`${surl}/otpsignup`, { userid: userid, password: password, email: email }).then((resp1) => {
                                if (resp1.data != "successfull") {
                                    alert("Somthing went wrong signup failed!");
                                }
                            });
                        }
                        else
                         {
                            alert("wrong otp signup failed");
                            $("#otpinput").attr("value","");
                            $(".otpverification").css({ "visibility": "hidden" });
                            event.target.elements["userid"].value = "";
                            event.target.elements["email"].value = "";
                            event.target.elements["password"].value = "";
                        }
                    });
                    $(".otpverification").css({ "visibility": "visible" });

                }

            });
        }

    }

    return (
        <section className="loginform signupform">
            <div class="container text-center">
                <div class="row">
                    <div className="bubble-container" id="bubble-container" style={{position:"absolute",top:0,bottom:0,right:0,left:0,zIndex:"100"}}></div>
                    <div style={{ textAlign: "center" }} className="col">
                        <div style={{ textAlign: "center", minWidth: "300px", maxWidth: "600px", margin: "0 auto" }}>
                            <div>
                                <h1 style={{ fontFamily: "serif", fontWeight: 600, fontSize: "160%",zIndex:"200",position:"relative" }}>New User Signup</h1>
                            </div>
                            <form method="post" style={{ display: "block",zIndex:200,position:"relative" }} onSubmit={signupform}>
                                <div class="mb-3">
                                    <label class="form-label">UserId</label>
                                    <input onFocus={inpborder} type="text" name="userid" class="form-control" placeholder="Enter UserId Here" required />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email</label>
                                    <input onFocus={inpborder} type="email" name="email" class="form-control" placeholder="Enter Email Here" required />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Password</label>
                                    <input onFocus={inpborder} type="password" name="password" class="form-control" placeholder="Enter Password Here" required />
                                    <span id="passwordHelpInline" class="form-text" style={{ color: "gray", display: "block", marginTop: "12px" }}>
                                        Must be 8-20 characters long.
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <input type="submit" value="Confirm" />
                                    <button className="signup_login" id="sback" style={{ marginLeft: "20px" }}>Back</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};
export default Signup;