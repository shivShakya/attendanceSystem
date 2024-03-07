import React from "react";
import { useNavigate } from 'react-router-dom';

function SignIn(){
    const nav = useNavigate();
 
    const handleGoogleSignIn = () => {
        window.open("http://localhost:5001/auth", "_self")
    };
    
    return(
        <div className="signin">
            <div class="w-96 border border-white rounded-md mt-4 p-6">
                <div class="form-group mb-4 border border-black rounded-lg  bg-blue-500">
                    <input type="text" id="name" name="name" class="w-full border-gray-300 rounded-md px-4 py-2" placeholder="Enter your name" />
                </div>

                <div class="form-group mb-4">
                    <input type="email" id="email" name="email" class="w-full border-gray-300 rounded-md px-4 py-2" placeholder="Enter your email" />
                </div>

                <div class="form-group mb-4">
                    <input type="password" id="password" name="password" class="w-full border-gray-300 rounded-md px-4 py-2" placeholder="Enter your password" />
                </div>

                <button class="w-full bg-red-950 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-2" onClick={()=>{nav('/register')}}>Register</button>

                <div class="text-center">Or register with:</div>
                
                <div class="flex justify-center mt-2">
                    <button class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md mr-2" onClick={handleGoogleSignIn}>Google</button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
