import React from "react"
import { Link } from "react-router"
import {SelectedPage} from "./types.ts"
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
    setSelectedPage: (value: SelectedPage) => void;
}

const ActionButton = ({children, setSelectedPage}: Props) => {
  return (
    <Link to="/real" className="rounded-md bg-teal-500 px-10 py-2 hover:bg-teal-300 hover:text-white">
       Try Project     
    </Link>
  )
}

// <Link to="/real" className="topButtons"> Try Project !! </Link>  
export default ActionButton