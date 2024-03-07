import React from "react";
import TrainData from "./TrainData";
import Instrustion from "../MainPage/Instruction";
import AttendanceTable from "./AttendanceTable";
import { useLocation } from "react-router-dom";

function MainPage(){

      const location = useLocation();
      const { pathname } = location;
      const isAttendanceRoute = pathname.includes('attendance');
      const isRegisterRoute = pathname.includes('register');
       
      return(
           <div className="mainpage w-full h-full bg-mycolormain" >
                  {
                          isRegisterRoute ? <div>
                                <TrainData />
                                <Instrustion />
                          </div> : <div>
                                    <AttendanceTable />
                          </div>
                  }
           </div>
      )
}

export default MainPage;