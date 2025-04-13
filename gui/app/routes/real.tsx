import React from 'react';
import { useState } from "react";
import "./css/real.css";
import { Link } from "react-router-dom";
import type { Route } from "./+types/home";
import {
  type FileUpload,
  parseFormData,
} from "@mjackson/form-data-parser";
import type { ActionFunctionArgs } from "react-router";
import Three from './three';


export default function Real() {
  const uploadHandler = async (fileUpload: FileUpload) => {
    if (fileUpload.fieldName === "avatar") {
      // process the upload and return a File
    }

    console.log(fileUpload);
  }

  const [section, setSection] = useState("settings");

  const refreshPage = () => {
    window.location.reload();
  };
  const closeWindow = () => {
    window.close();
  };

  return <div className="everything">
    <nav className="nav bg-teal-100 z-50 shadow-md">
      <div className="title text-black"> QUANTA </div>
      {/* <div className="subtitle text-black"> See how the better Fusion360 works &lt;3 </div> */}
    </nav>

    <main className="mainbody">
      <div className="sidebar bg-teal-50 shadow-xl">
        <div className="topButtons">
          <button className="setB bg-teal-500" id="settingsButton" onClick={() => setSection('settings')}>
            Simulate Models
          </button>

          <button className="mainB bg-teal-500" id="dasboardButton" onClick={() => setSection('dashboard')}>
            Guide
          </button>


        </div>


      </div>

      <div className="sidedisplay bg-transparent">
        {
          section === 'dashboard' && (
            <div id="dashboard">
              <div className="main-flex">
                <button className="refresh bg-teal-500" onClick={() => refreshPage()}>Refresh</button>
              </div>

              <div className="update-text">
              </div>
            </div>

          )
        }




        {
          section === 'settings' && (
            <div className="w-full h-full items-center justify-between">
              {/* <input className="searchContentBar" type="text" id="searchFiles"
                placeholder="Search Materials..." /> */}

              {/* <input type="file" className="bg-teal-500 hidden" id="guideButton" onChange={(event) => uploadHandler(event)} />
              <label htmlFor="guideButton" className="uploadB bg-teal-100 rounded-md px-10 py-2 absolute">Upload</label> */}

              {/* <Link to="/three" className="simulate rounded-md bg-teal-500 px-10 py-2 hover:bg-teal-300 hover:text-white">
                        Simulate
                     </Link> */}
              <Three />
            </div>
          )
        }
      </div>

    </main>

  </div>;
}
