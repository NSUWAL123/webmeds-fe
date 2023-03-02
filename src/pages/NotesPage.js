import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteItem from "../components/NoteItem";
import { getTokenFromLocalStorage } from "../utils/handleToken";
import { useDispatch, useSelector } from "react-redux";
import { addNote, fillNote } from "../redux/noteSlice";
import { notifyError, notifyInfo } from "../utils/Toast";
import { ToastContainer } from "react-toastify";
import { clearForm } from "../utils/clearForm";
import ProtectedRoutes from "../routes/ProtectedRoutes";

const NotesPage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //selector
  const noteData = useSelector((state) => state.notes);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getTokenFromLocalStorage(),
    },
  };

  const AddNote = async () => {
    if (!title | !description) {
      notifyError("Title and Description should be provided.");
      return;
    }

    let response = await axios.post(
      `http://localhost:5000/notes/add`,
      { title, description },
      config
    );

    dispatch(addNote(response.data));
    notifyInfo("New note has been added.");

    clearForm();
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    (async () => {
      let response = await axios.get(`http://localhost:5000/notes`, config);
      window.scrollTo(0, 0);
      let { data } = response;

      dispatch(fillNote(data.getNotes));
    })();
  }, []);

  console.log(noteData);

  return (
    <>
      <ProtectedRoutes />
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <p className="font-medium text-lg mb-1">Description</p>
            <textarea
              type="text"
              rows="4"
              className="border w-full px-1 text-lg resize-none rounded-sm outline-none pl-2"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-[#37474F] text-white px-3 py-1 rounded-md"
              onClick={() => AddNote()}
            >
              Add Note
            </button>
          </div>
        </div>

        {/* showing notes section */}
        {noteData.length === 0 && (
          <div className="mt-9 w-full flex justify-center">
            {/* if no notes present */}
            <div className="bg-white flex justify-center items-center h-[100px] text-2xl font-semibold max-w-[650px] w-full rounded-lg shadow-2xl">
              <h1>No Notes To Display</h1>
            </div>
          </div>
        )}

        {noteData.length !== 0 && (
          <div className="mt-9 w-full bg-white px-4 rounded-lg  shadow-2xl ">
            <div className="flex justify-center py-5">
              <h1 className="text-2xl font-semibold">Your Notes</h1>
            </div>

            <div className="md:flex md:flex-wrap justify-around">
              {noteData.map((data) => {
                return <NoteItem key={data._id} noteData={data} />;
              })}
            </div>
          </div>
        )}

        <ToastContainer
          autoClose={3000}
          hideProgressBar={true}
          theme="colored"
        />
      </div>
    </>
  );
};

export default NotesPage;
