import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import MainPage from "../MainPage/MainPage";


function Register(){
      
      return(
          <div className="r-page h-screen flex justify-start items-start bg-black text-white first-page" >
                    <Sidebar />
                    <MainPage />
          </div>
      )
}
export default Register;