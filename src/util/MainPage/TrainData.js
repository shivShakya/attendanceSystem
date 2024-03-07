import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTrained } from '../../Redux/trainSlice';

function TrainData() {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(null);
    const [exist, setExist] = useState(false);
    const [name, setName] = useState('');
    const trained = useSelector(state => state.train.trained);
    const dispatch = useDispatch();

    function onDropPics(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            if (uploadedImages.length < 30) {
                newImages.push(files[i]);
            } else {
                alert('You can upload a maximum of 30 images.');
                break;
            }
        }
        setUploadedImages(prevImages => [...prevImages, ...newImages]);
    }

    async function uploadImages() {
        console.log({ss : exist});
        if (exist) { 
               alert("dataset already exist .");
               return ;
        }
            const numImages = uploadedImages.length;
            if (numImages >= 20 && numImages <= 30) {
                setLoading(true);
                const formData = new FormData();
                formData.append('name', name);
                uploadedImages.forEach((image, index) => {
                    formData.append(`image${index + 1}`, image);
                });

                try {
                    const response = await fetch('http://localhost:5000/upload', {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();

                    alert(data.message);

                    dispatch(setTrained(data.status === 200));
                    if (data.status === 200) {
                        setUploadedImages([]);
                        setName('');
                    }
                } catch (error) {
                    console.error('Error uploading images:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                alert("Please upload between 20 and 30 images.");
            }
        
    }

    useEffect(() => {
        check();
    }, [name]);

    async function check() {
        const formData = new FormData();
        formData.append('name', name);
        try {
            const response = await fetch('http://localhost:5000/check', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log({data});
            setExist(data.exists);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    }

    function handleFileInputChange(event) {
        const files = event.target.files;
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            if (uploadedImages.length < 30) {
                newImages.push(files[i]);
            } else {
                alert('You can upload a maximum of 30 images.');
                break;
            }
        }
        setUploadedImages(prevImages => [...prevImages, ...newImages]);
    }

    function onDragOver(event) {
        event.preventDefault();
    }

    function toggleImageSelection(index, shiftKeyPressed) {
        let updatedSelectedImages = [...selectedImages];
        if (shiftKeyPressed) {
            const firstSelectedIndex = updatedSelectedImages.length > 0 ? updatedSelectedImages[0] : -1;
            const lastIndex = firstSelectedIndex !== -1 ? firstSelectedIndex : index;
            const minIndex = Math.min(lastIndex, index);
            const maxIndex = Math.max(lastIndex, index);
            updatedSelectedImages = Array.from({ length: maxIndex - minIndex + 1 }, (_, i) => minIndex + i);
        } else {
            const selectedIndex = updatedSelectedImages.indexOf(index);
            if (selectedIndex === -1) {
                updatedSelectedImages.push(index);
            } else {
                updatedSelectedImages.splice(selectedIndex, 1);
            }
        }
        setSelectedImages(updatedSelectedImages);
    }

    function deleteSelectedImages() {
        const updatedImages = uploadedImages.filter((_, index) => !selectedImages.includes(index));
        setUploadedImages(updatedImages);
        setSelectedImages([]);
    }

    return (
        <div className='trainData m-2'>
            <div className='train-btns flex justify-start items-center'>
                <button className='border mt-8 ml-4 border-white rounded-full hover:bg-red-950 px-2 text-white bg-black'>Upload Images</button>
                <button className='border mt-8 ml-4 border-white rounded-full hover:bg-red-950 hover:text-white px-2 bg-black text-red-600' onClick={deleteSelectedImages}>Delete Dataset</button>
            </div>

            <div
                onDragOver={onDragOver}
                onDrop={onDropPics}
                className='w-7/8 h-96 m-4 border border-white bg-black flex flex-col justify-start items-start opacity-55'>
                <div className='flex justify-start items-center w-full'>
                    <div className={`border border-white p-2 ${uploadedImages.length > 30 || uploadedImages.length < 20 ? 'bg-red-500' : 'bg-green-500'}`}>{uploadedImages.length}/30 images </div>
                </div>
                <div className='flex justify-left items-left w-full flex-wrap' style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {uploadedImages.map((image, index) => (
                        <div key={index} className={`relative`}>
                            <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} className={`w-32 h-32 bg-white mt-10 mr-4 cursor-pointer ${selectedImages.includes(index) ? 'border-2 border-blue-500' : ''}`} onClick={(event) => toggleImageSelection(index, event.shiftKey)} />
                        </div>
                    ))}
                    {uploadedImages.length === 0 && (
                        <div className='w-full flex flex-col'>
                            <input id="fileInput" type='file' className='hidden' onChange={handleFileInputChange} />
                            <label htmlFor="fileInput" className='m-32  h-48 cursor-pointer'>Drag and Drop or click here</label>
                        </div>

                    )}
                </div>
            </div>

            <div className='flex justify-center items-center'>
                <input className='w-3/4 h-8 border border-white text-2xl px-2 bg-transparent' value={name} onChange={(e) => { setName(e.target.value) }} type='text' />
                <button className="border h-8 font-2xl font-extrabold p-1 ml-2 w-48 bg-red-950 border-white" onClick={uploadImages}>Train your Data {loading ? <img src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm5mOWpxZGF4MGc2cW1na205Y2M2Zm5nZ2d3cWc5eG0zaWxrMm8zMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif' alt='load' className='w-6 h-6' /> : <div></div>}</button>
            </div>
            {trained ? <div>Your Dataset is ready please forward to initial testing step </div> : <div></div>}
        </div>
    );
}

export default TrainData;
