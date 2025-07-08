import react from "react";
import reactDom from"react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserAuthentication from "./userdetails/UserAuthentication.jsx";
import MainWindow from "./homepage/MainWindow.jsx";
import Adduser_qr from "./homepage/Adduser_qr.jsx";

const surl= process.env.SURL;
const routes=createBrowserRouter([
  {
  path:"/",element:<UserAuthentication/>
},
{
  path:"/timedrop/home",element:<MainWindow/>
},
{
  path:"/newuser/qr/:id",element:<Adduser_qr/>
}
]);
const root=reactDom.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={routes}/>
);
export default surl;