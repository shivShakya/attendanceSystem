import React, { useState } from "react";
import { Link , useLocation } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import { setPrediction , setLocation } from "../../Redux/trainSlice";
import Webcam from 'react-webcam';

function Sidebar() {
    const trained = useSelector(state => state.train.trained);
    const prediction = useSelector(state => state.train.prediction);
    const [loading , setLoading] = useState(false);
    const [cameraStopped , setCameraStopped] = useState(false);
    const webcamRef = React.useRef(null);
    const dispatch = useDispatch();


    const location = useLocation();
    const { pathname } = location;
    const isAttendanceRoute = pathname.includes('attendance');
    const isRegisterRoute = pathname.includes('register');

    const captureVideo = () => {

        if(cameraStopped){
               alert("Your Attendance is marked for today ");
               return;
        }
        setLoading(true);
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        };
    
        const mediaRecorder = new MediaRecorder(webcamRef.current.stream, {
            mimeType: 'video/webm; codecs=vp9'
        });
    
        const chunks = [];
        mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                chunks.push(event.data);
            }
        };
    
        mediaRecorder.onstop = () => {
            const videoBlob = new Blob(chunks, { type: 'video/webm' });
            const videoFile = new File([videoBlob], 'video.webm', { type: 'video/webm' });
    
            const formData = new FormData();
            formData.append('video', videoFile);
            
            fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message); 
                dispatch(setPrediction(data.message));
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        };
    
        mediaRecorder.start();
        setTimeout(() => {
            mediaRecorder.stop();
            alert("Video has been recorded.");
            saveLocation();
            webcamRef.current.video.srcObject.getTracks().forEach(track => track.stop());
            setCameraStopped(true);
        }, 6000);
    };

    const saveLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                dispatch(setLocation({ latitude, longitude }));
            }, error => {
                console.error('Error getting location:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };
    

    const renderWebcam = () => {
        if (isRegisterRoute && trained) {
            return (
                <div className="w-52 h-52 border border-white bg-black flex justify-end items-start">
                    <div className="absolute z-10 w-10 h-6 border border-white font-sans">0/2</div>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        className="h-full"
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            width: 1280,
                            height: 720,
                            facingMode: "user"
                        }}
                    />
                </div>
            );
        }else if(isAttendanceRoute){
            return (
                <div className="w-52 h-52 border border-white bg-black flex justify-end items-start">
                    <div className="absolute z-10 w-10 h-6 border border-white font-sans">0/2</div>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        className="h-full"
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            width: 1280,
                            height: 720,
                            facingMode: "user"
                        }}
                    />
                </div>
            );
        }
    };
    

    return (
        <div className="sidebar flex justify-between items-center bg-mycolor flex-col border border-white h-full w-72">
            <div className="border-2 p-2 font-extrabold mt-12 border-white shadow-white  bg-transparent bg-black">{isRegisterRoute ? "Face based Registration" : "Attendance Board"}</div>
            <div className="board flex justify-center items-center flex-col">
            {isRegisterRoute ? <Link to={"/attendance"} className="text-left">Attendance Board </Link> : <Link to={"/register"} className="text-left">Face Registration</Link>} 
                <Link to={"/settings"} className="text-left">Settings </Link>
                <Link to={"/faq"} className="text-left">Facts & Help </Link>
                <Link to={"/"} className="text-left">Logout </Link>
            </div>
            <div className="flex justify-start items-center flex-col">
                <div className="border-2 p-2 font-extrabold mb-7 border-white shadow-white  bg-transparent bg-black">{isRegisterRoute ? "Initial Testing" : "Mark your Attendance"}</div>
                {renderWebcam()} 
                <button onClick={captureVideo} className="border font-2xl font-extrabold p-1 m-5 w-full bg-red-950 border-white">Record {loading ? <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm94Nnl4ZHdlNTZoenNlcmR6N3F4bmlhYjFyNzAweXJ5MzMxa2Q3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif" className="w-4 h-4" /> : <p></p>}</button>
                {prediction && isRegisterRoute &&  <div>Result : {prediction}</div>}
            </div>
        </div>
    );
}

export default Sidebar;
