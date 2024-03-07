import React, { useState, useEffect } from "react";
import "./FirstPage.css";
import SignIn from "./SignIn";
import { useNavigate } from 'react-router-dom';

function FirstPage() {
  const [showNewDiv, setShowNewDiv] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowNewDiv(true);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-mycolor first-page flex justify-center items-center h-screen">
      {
           !showNewDiv && (
            <>    <div
                      className="w-12 h-20 border m-2 md:m-8 border-white rounded-md bg-black animate-move-and-rotate"
                      style={{
                          animationDuration: "4s",
                          animationIterationCount: "1"
                      }}>
                  </div>
                  
                  <div className="f-page w-1/2 text-white text-3xl animate-pulse">
                          Face Recognition System <br />
                 </div>
            </>
           )
      }
      {showNewDiv && (
        <div className="transition-opacity duration-5000 opacity-0 flex justify-center items-center flex-col" style={{ opacity: 1 }}>
            <div className="f-page w-full text-white text-3xl animate-pulse"> Face Recognition System <br /></div>  
                <SignIn />
            </div>
      )}
    </div>
  );
}

export default FirstPage;
