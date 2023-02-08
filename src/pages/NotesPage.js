import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteItem from "../components/NoteItem";
import { getTokenFromLocalStorage } from "../utils/handleToken";
import { useDispatch, useSelector } from "react-redux";
import { addNote, fillNote } from "../redux/noteSlice";

const NotesPage = () => {
  const [notes, setNotes] = useState(" ");
  const dispatch = useDispatch();

  //selector
  const noteData = useSelector((state) => state.notes);
  console.log(noteData);

  const token = getTokenFromLocalStorage();
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  };

  useEffect(() => {
    (async () => {
      //await getAllProducts()
      const response = await axios.get(`http://localhost:5000/notes`, config);
      const { data } = response;
      // console.log(data.getNotes)
      dispatch(fillNote(data.getNotes));
      // setProduct(data);
    })();
  });

  // useEffect(() => {
  //   (async () => {
  //     //await getAllProducts()
  //     const response = await axios.get("http://localhost:5000/notes/");
  //     const { data } = response;
  //     setNotes(data);
  //     // console.log(data)
  //   })();
  // }, []);
  // console.log(notes)

  return (
    <div className="w-full flex flex-col items-center">
      {/* add notes section */}
      <div className="w-full bg-white h-[380px] flex flex-col justify-evenly px-4 max-w-[650px] rounded-lg  shadow-2xl">
        <div className="flex justify-center text-2xl font-semibold">
          <h1>Add a Note</h1>
        </div>
        <div>
          <p className="font-medium text-lg mb-1">Title</p>
          <input
            type="text"
            className="border w-full px-1 text-lg rounded-sm outline-none pl-2"
          />
        </div>
        <div>
          <p className="font-medium text-lg mb-1">Description</p>
          <textarea
            type="text"
            rows="4"
            className="border w-full px-1 text-lg resize-none rounded-sm outline-none pl-2"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-[#37474F] text-white px-3 py-1 rounded-md"
            onClick={() => dispatch(addNote())}
          >
            Add Note
          </button>
        </div>
      </div>

      {/* showing notes section */}
      {/* <div className="mt-9 w-full flex justify-center"> */}
      {/* if no notes present */}
      {/* <div className="bg-white flex justify-center items-center h-[100px] text-2xl font-semibold max-w-[650px] w-full rounded-lg shadow-2xl">
          <h1>No Notes To Display</h1>
        </div>
      </div> */}

      {/* if notes are present */}
      <div className="mt-9 w-full bg-white px-4 rounded-lg  shadow-2xl">
        <div className="flex justify-center py-5">
          <h1 className="text-2xl font-semibold">Your Notes</h1>
        </div>

        <div className="border p-2 mb-3">
          {/* {
            noteData.map((data) => {
              return (
                <li>{data}</li>
              )
            })
          } */}
          <NoteItem />
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
