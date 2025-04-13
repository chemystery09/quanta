import React from 'react'
import { Link } from 'react-router-dom';
import {SelectedPage} from "../../shared/types.ts"
import ActionButtonProject from "../../shared/ActionButtonProject.tsx"
import useMediaQuery from "../../hooks/useMediaQuery.ts"

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

function Credits({setSelectedPage}: Props) {
const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

return <section
    id="credits"
    className="gap-16 bg-teal-50 py-3 md:h-full align-items-center justify-center">
    <div className="box px-10 py-0">
        <div className='links flex flex-row items-center justify-center gap-10'>
            <div className="github ">
                <a href = "https://github.com/chemystery09/bitcamp-25" className = "text-black hover:text-teal-500">
                Github
                </a>
            </div>

            <div className="devpost">
                <a href = "https://devpost.com/software/quanta-obvusa#updates" className = "text-black hover:text-teal-500">
                Devpost
                </a>
            </div>
            
            <p className="text-center text-teal-500">
            @ Bitcamp 2025
            </p>
            
        </div> 
        
    </div>
    

</section>;
}

export default Credits