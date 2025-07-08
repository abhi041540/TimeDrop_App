import React, { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import $ from "jquery";
import Otp_verification from "./Otp_verification";
import Passwordchange_otp from "./Passwordchange_otp";
import AppLogo from "../homepage/AppLogo";
function UserAuthentication() {
    var [cc, setCc] = useState(1);
    useEffect(() => {
        $("#lsignup").on("click", () => {
            setCc(2);
        });
        $("#sback").on("click", () => {
            setCc(1);
        });
        $("#forgotwindowbutton").on("click", () => {
            setCc(3);
        });
        $("#fback").on("click", () => {
            setCc(1);
        });
    }, [cc])
    if (cc == 1) {
        return (
            <div>
                <AppLogo />
                <Login />
            </div>

        );
    }
    else if (cc == 2) {
        return (
            <div>
                <AppLogo />
                <Otp_verification />
                <Signup />

            </div>
        );
    }
    else {
        return (
            <div>
                <AppLogo />
                <Passwordchange_otp />
                <ForgotPassword />
            </div>
        );
    }

};
export default UserAuthentication;