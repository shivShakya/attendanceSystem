import React from 'react';


function Instrustion(){
        
       return(
           <div className='inst'>
                       <div className='train-btns flex justify-start items-center'>
                                <button className='border mt-8 ml-4 border-white rounded-full hover:bg-red-950 px-2 text-white bg-black '>Instrustions</button>
                       </div>
                       <div className='w-7/8 h-full bg-transparent border flex border-white m-2'>
                                <img src='inst.jpg' alt='inst' className='w-32 h-32 border-white border m-4' />
                                <img src='inst.jpg' alt='inst' className='w-32 h-32 border-white border m-4' />
                                <img src='inst.jpg' alt='inst' className='w-32 h-32 border-white border m-4 ' />
                                <img src='inst.jpg' alt='inst' className='w-32 h-32 border-white border m-4' />
                                <img src='inst.jpg' alt='inst' className='w-32 h-32 border-white border m-4' />
                                <img src='inst.jpg' alt='inst' className='w-32 h-32 border-white border m-4' />
                                <img src='inst.jpg' alt='inst' className='w-32 h-32 border-white border m-4' />
                                <img src='inst.jpg' alt='inst' className='w-32 h-32 border-white border m-4' />
                       </div>
           </div>
       )
}

export default Instrustion;