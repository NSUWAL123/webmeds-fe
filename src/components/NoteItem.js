import React from 'react';
import deleteicn from "../pictures/icons/delete.svg";
import edit from "../pictures/icons/edit.svg";


const NoteItem = () => {
  return (
    <div className='flex flex-col items-center h-[150px] justify-evenly'>
        <h1 className='text-lg font-semibold'>This is notes title</h1>
        <div>
            <p>this is notes description.... bla. bla bla.... Medicine dosage 3 times a day after food. only one tablet at a time. </p>
        </div>
        <div className='flex items-center w-[60px] justify-between'>
            <button><img src={edit} alt="" srcset="" /></button>
            <button><img src={deleteicn} alt="" /></button>
        </div>
    </div>
  )
}

export default NoteItem