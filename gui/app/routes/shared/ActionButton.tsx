import React from "react"
import { Link } from "react-router"
import {SelectedPage} from "./types.ts"

type Props = {
    children: React.ReactNode;
    setSelectedPage: (value: SelectedPage) => void;
}

const ActionButton = ({children, setSelectedPage}: Props) => {
  return (
    <Link className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-purple-300 hover:text-white"
    to={`#${SelectedPage.TryIt}`}
    onClick={() => setSelectedPage(SelectedPage.TryIt)}
    >
        {children}
    </Link>
  )
}

export default ActionButton