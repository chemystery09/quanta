import type { Route } from "./+types/home";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "reads good" },
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
        <div className ="title"> Reads Good !! </div>
        <div className ="subtitle"> Find your future favs &lt;3 </div>
    </nav>

    <main className = "mainbody">
        <div className="sidebar">
            <div className="topButtons">
              <button className ="mainB" id="dasboardButton" onClick={() => setSection('dashboard')}>
                Book Recs
              </button>
              <button className ="mainB" id="systemsButton" onClick={() => setSection('systems')}>
                Browse Books
              </button>
              <button className ="mainB" id="guideButton" onClick={() => setSection('guide')}>
                Simulate
              </button>
              <button className ="setB" id="settingsButton" onClick={() => setSection('settings')}>
                Settings
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
