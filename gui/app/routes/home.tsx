import type { Route } from "./+types/home";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CT goods" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [section, setSection] = useState("dashboard");
  const refreshPage = () => {
    window.location.reload();
  };
  const closeWindow = () => {
    window.close();
  };
  
  return <div className = "everything">
     <nav className = "nav"> 
        <div className ="title"> CT Goods !! </div>
        <div className ="subtitle"> Check out CT's &lt;3 </div>
    </nav>

    <main className = "mainbody">
        <div className="sidebar">
            <div className="topButtons">
              <button className ="mainB" id="dasboardButton" onClick={() => setSection('dashboard')}>
                Search Patients
              </button>
              <button className ="mainB" id="systemsButton" onClick={() => setSection('systems')}>
                Search Patients
              </button>
              <button className ="mainB" id="guideButton" onClick={() => setSection('guide')}>
                Render
              </button>
              <button className ="setB" id="settingsButton" onClick={() => setSection('settings')}>
                Upload CT Scans
              </button>
            </div>
            
            <div className="bottomButtons">
              <button className ="logB" id="logoutButton" onClick={() => closeWindow()}>
                Logout
              </button>
            </div>
            
            
        </div>

        <div className = "sidedisplay">
            {
              section === 'dashboard' && (
                <div id="dashboard">
                  <div className="main-flex">
                    <button className = "refresh" onClick={() => refreshPage()}>Refresh</button>
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
                          placeholder="Search Books..."/> 
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
                   
                </div>
              )
            }
        </div>

    </main>
 



  </div>;
}
