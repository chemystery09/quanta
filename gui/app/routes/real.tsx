import React from 'react';
import { useState } from "react";
import "./css/real.css";
import { Link } from "react-router-dom";
import type { Route } from "./+types/home";


export default function Real() {
    const [section, setSection] = useState("dashboard");
    const refreshPage = () => {
      window.location.reload();
    };
    const closeWindow = () => {
      window.close();
    };
    
    return <div className = "everything">
       <nav className = "nav bg-teal-100 z-50 shadow-md"> 
          <div className ="title text-black"> QUANTA !! </div>
          <div className ="subtitle text-black"> See how the better Fusion360 works &lt;3 </div>
      </nav>
  
      <main className = "mainbody">
          <div className="sidebar bg-teal-50 shadow-xl">
              <div className="topButtons">
                <button className ="mainB bg-teal-500" id="dasboardButton" onClick={() => setSection('dashboard')}>
                  Guide
                </button>
                <button className ="mainB bg-teal-500" id="systemsButton" onClick={() => setSection('systems')}>
                  Search Materials
                </button>
                <button className ="mainB bg-teal-500" id="guideButton" onClick={() => setSection('guide')}>
                  Upload OBJ File
                </button>
                <button className ="setB bg-teal-500" id="settingsButton" onClick={() => setSection('settings')}>
                  Simulate
                </button>
              </div>
              
              
          </div>
  
          <div className = "sidedisplay bg-transparent">
              {
                section === 'dashboard' && (
                  <div id="dashboard">
                    <div className="main-flex">
                      <button className = "refresh bg-teal-500" onClick={() => refreshPage()}>Refresh</button>
                    </div>
  
                    <div className="update-text">
                    </div>
                  </div>
                )
              }
  
              {
                section === 'systems' && (
                  <div id="systems">
                    <div className = "main-flex">
                        <input className="searchContentBar" type="text" id="searchFiles"
                            placeholder="Search Materials..."/> 
                        <button className = "refresh" onClick={() => refreshPage()}>Refresh</button>
                    </div>
                  </div>
                )
              }
  
              {
              section === 'guide' && (
                  <div id="guide">
                  <h1>Guide</h1>
                      
                  </div>
                  )
                }
  
              
              {
                section === 'settings' && (
                  <div id="settings">
                     <Link to="/three" className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-purple-300 hover:text-white">
                        Simulate Model
                     </Link>
                  </div>
                )
              }
          </div>
  
      </main>
  
    </div>;
  }