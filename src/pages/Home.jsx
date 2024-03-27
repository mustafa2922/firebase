import React from "react";
import { GetAllDocs, UploadFile } from "../firebase/firebase";

function home() {
  const getUsers = async () => {
    try {
      const data = await GetAllDocs("users");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFile = async (event)=>{
    const file = event.target.files[0];
    try{
        const res = await UploadFile(file);
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          getUsers();
        }}
      >
        Get All Users
      </button>
      
      <input  type="file" onChange={(e)=>{handleFile(e)}} />

    </div>
  );
}

export default home;
