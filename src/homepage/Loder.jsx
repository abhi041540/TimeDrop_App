import React from "react";
function Loder()
{
    return(
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center",width:"100%",height:"100vh"}}>
            <div class="spinner-border text-light"id="loder" role="status" style={{fontSize:"120%"}}>
                    <span class="visually-hidden">Loading...</span>
                </div>
        </div>
    );
};
export default Loder;