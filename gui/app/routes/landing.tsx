import React from 'react';
import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import Navbar from "./components/navbar";
import { Link } from "react-router-dom";
import "./css/landing.css"
import { SelectedPage } from "./shared/types.ts";
import Home from "./components/home/index.tsx";
import Quantum from "./components/quantum/index.tsx";
import Project from "./components/project/index.tsx";
import Credits from "./components/credits/index.tsx";


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
        </div>
        <div>
            <Quantum setSelectedPage = {setSelectedPage} />
        </div>
        <div className="bg-teal-100">
            <Project setSelectedPage = {setSelectedPage}/>
        </div>
        <div className="bg-teal-100">
            <Credits setSelectedPage = {setSelectedPage}/>
        </div>
    </div>
}