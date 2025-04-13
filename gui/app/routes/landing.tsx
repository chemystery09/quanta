import React from 'react';
import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import Navbar from "./components/navbar";
import { Link } from "react-router-dom";
import "./css/landing.css"
import { SelectedPage } from "./shared/types.ts";
import Home from "./components/home/index.tsx";
import Quantum from "./components/quantum/index.tsx";



export default function Landing()  {
    const [selectedPage, setSelectedPage] = useState<SelectedPage>(
        SelectedPage.Home
    );
    const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
    useEffect(()=> {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsTopOfPage(true);
                setSelectedPage(SelectedPage.Home);
            }
            if (window.scrollY !== 0) setIsTopOfPage(false);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

return <div>
        <div className="bg-teal-100">
            <Navbar 
            isTopOfPage = {isTopOfPage}
                selectedPage = {selectedPage}
                setSelectedPage = {setSelectedPage}  
            />
            <Home setSelectedPage = {setSelectedPage} />
            <Quantum setSelectedPage = {setSelectedPage} />
            {/*<Project setSelectedPage = {setSelectedPage} /> */}
            {/*<Demo setSelectedPage = {setSelectedPage} /> */}
        </div>
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="title"> QUANTA  </div>
            <div className="subtitle"> Quantum-Assisted Nano-Structural Analysis </div>
                  
        </div>
    </div>
}