import React from "react"
import { Link } from "react-router"
import {SelectedPage} from "./types.ts"

type Props = {
    children: React.ReactNode;
    setSelectedPage: (value: SelectedPage) => void;
}

const ActionButton = ({children, setSelectedPage}: Props) => {
  return (
    <Link className="rounded-md bg-teal-400 px-10 py-2 hover:bg-teal-300 hover:text-white"
    to={`#${SelectedPage.Project}`}
    onClick={() => setSelectedPage(SelectedPage.Project)}
    >
        {children}
    </Link>
  )
}

export default ActionButton