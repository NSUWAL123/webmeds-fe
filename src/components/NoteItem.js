import React, { useState } from "react";
import deleteicn from "../pictures/icons/delete.svg";
import edit from "../pictures/icons/edit.svg";
import DeleteNote from "./modals/DeleteNote";
import EditNote from "./modals/EditNote";

const NoteItem = (props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { noteData } = props;

  return (
    <div className="flex flex-col items-center min-h-[150px] justify-evenly p-2 mb-3 rounded-md bg-[#FFC655] md:w-[45%] md:mb-8 md:min shadow-lg">
      <h1 className="text-lg font-semibold">{noteData.title}</h1>
      <div>
        <p>{noteData.description}</p>
      </div>
      <div className="flex items-center w-[60px] justify-between">
        <button onClick={() => setShowEditModal(true)}>
          <img src={edit} alt="" />
        </button>
        <button  onClick={() => setShowDeleteModal(true)}>
          <img src={deleteicn} alt="" />
        </button>
      </div>

      {(showEditModal) && <EditNote setShowEditModal={setShowEditModal} noteData={noteData}/>}

      {(showDeleteModal) && <DeleteNote setShowDeleteModal={setShowDeleteModal} noteData={noteData}/>}
    </div>
  );
};

export default NoteItem;
