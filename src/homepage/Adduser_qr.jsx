import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
var adduser_qr = "";
function Adduser_qr() {
    adduser_qr = useParams().id;
    const nav= useNavigate();
    useEffect(() => {
        nav("/");
       
    }, []);
}
export default Adduser_qr;
export {adduser_qr};