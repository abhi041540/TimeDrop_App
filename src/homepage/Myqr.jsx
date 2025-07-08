import axios from 'axios';
import React, { useEffect, useState } from 'react';
import surl from '..';
import { userid } from '../userdetails/Login';
import $ from "jquery";
axios.defaults.withCredentials = true;
function Myqr() {
    var [qrUrl, setqrUrl] = useState("");
    const handleDownload = () => {
        if (qrUrl.length > 0) {
            const link = document.createElement('a');
            link.href = qrUrl;
            link.download = 'TimeDrop_Qrcode.png';
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleShare = async () => {
        if (qrUrl.length > 0) {
            try {
                if (navigator.share) {
                    await navigator.share({
                        title: 'My QR Code',
                        text: 'Scan this QR code',
                        url: qrUrl,
                    });
                } else {
                    alert('Sharing not supported on this browser.');
                }
            } catch (err) {
                alert("Somthing Went Wrong Try Again!");
                console.error('Error sharing:', err);
            }
        }

    }

    useEffect(() => {
        axios.get(`${surl}/getqr/${userid}`).then((resp) => {
            setqrUrl(resp.data);
        });
    }, []);

    function ccw() {
        $(".qrcard").css({ "visibility": "hidden" });
        $(".myqr").css({ "visibility": "hidden" });
        $(".myqr-wrapper").css({ "visibility": "hidden"})
    }

    return (
        <section className="myqr" style={{ width: "100%", height: "100vh", zIndex: "200", position: "fixed", top: 0, left: 0, display: "flex", alignItems: "center", justifyContent: "center" ,visibility:"hidden"}}>
            <div class="container text-center" style={{ width: "100%", alignItems: "center" }}>
                <div class="row" style={{ padding: "40px" ,position:"relative"}}>
                    <div className="container myqr-wrapper d-flex justify-content-center align-items-center" style={{ visibility: "hidden"}}>
                        <div className="card text-center bg-dark text-light p-4 shadow-lg qrcard" style={{position:"relative",minWidth:"310px"}}>
                             <div onClick={ccw} className="contectsearchclose" style={{ position: "absolute", top: "1%", right: "1%", textAlign: "center", border: "2px solid white", padding: "0px 6px", borderRadius: "5px" }}>
                        <i className="ion-close-round"></i>
                    </div>
                            <h4 className="mb-4">📱 Your QR Code</h4>
                            {
                                qrUrl.length > 0 ? <img
                                    src={qrUrl}
                                    alt="My QR Code"
                                    className="img-fluid border border-secondary rounded"
                                    style={{ maxWidth: '300px' }}
                                /> : <div
                                    className="img-fluid border border-secondary rounded"
                                    style={{ maxWidth: '300px' }}
                                ><p class="placeholder-glow">
                                        <span class="placeholder col-12"></span>
                                    </p>

                                    <p class="placeholder-wave">
                                        <span class="placeholder col-12"></span>
                                    </p>
                                    <p class="placeholder-glow">
                                        <span class="placeholder col-12"></span>
                                    </p>

                                    <p class="placeholder-wave">
                                        <span class="placeholder col-12"></span>
                                    </p></div>
                            }
                            <div className="mt-4 d-flex justify-content-around">
                                <button className="btn btn-outline-light" onClick={handleShare}>
                                    🔗 Share
                                </button>
                                <button className="btn btn-outline-light" onClick={handleDownload}>
                                    💾 Save
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    );
};

export default Myqr;
