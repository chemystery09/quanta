import React from 'react';
import { useState } from "react";
import type { Route } from "./+types/home";
import Navbar from "./components/navbar";
import { Link } from "react-router-dom";
import "./css/landing.css"
import { SelectedPage } from "./shared/types.ts";



export default function Landing()  {
    const [selectedPage, setSelectedPage] = useState<SelectedPage>(
        SelectedPage.Home
    );

return <div className="bg-purple-100">
        <div>
        <Navbar 
            selectedPage = {selectedPage}
            setSelectedPage = {setSelectedPage}  
        />
        </div>
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="title"> QUANTA  </div>
            <div className="subtitle"> Quantum-Assisted Nano-Structural Analysis </div>
            <Link to="/real" className="topButtons"> Try Project !! </Link>        
        </div>
    </div>
}