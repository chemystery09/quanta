import React from 'react'
import { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Logo from "../assets/Logo.png"
import HashLink from "./HashLink"
import { SelectedPage } from "../../shared/types.ts"
import useMediaQuery from "../../hooks/useMediaQuery.ts"
import ActionButton from "../../shared/ActionButtonExternal.tsx"

type Props = {
    isTopOfPage: boolean;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
}

export default function Navbar({ isTopOfPage, selectedPage, setSelectedPage }: Props) {
    const flexBetween = "flex items-center justify-between";
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const navbarBackground = isTopOfPage ? "" : "bg-teal-100 drop-shadow"
    return <nav>
        <div
            className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}>
            <div className={`${flexBetween} mx-auto w-5/6`}>
                <div className={`${flexBetween} w-full gap-16`}>
                    <img alt="logo" src={Logo} />

                    {/*NAV*/}
                    {isAboveMediumScreens ? (
                        <div className={`${flexBetween} w-full`}>
                            <div className={`${flexBetween} gap-8 text-sm`}>
                                <HashLink page="Home"
                                    selectedPage={selectedPage}
                                    setSelectedPage={setSelectedPage} />
                                <HashLink page="Quantum"
                                    selectedPage={selectedPage}
                                    setSelectedPage={setSelectedPage} />
                                <HashLink page="Project"
                                    selectedPage={selectedPage}
                                    setSelectedPage={setSelectedPage} />
                                <HashLink page="Demo"
                                    selectedPage={selectedPage}
                                    setSelectedPage={setSelectedPage} />
                            </div>
                            <div className={`${flexBetween} gap-8`}>
                                <p>Dinosaur!</p>
                                <ActionButton setSelectedPage={setSelectedPage}>Try It!</ActionButton>
                            </div>
                        </div>
                    ) : (
                        <button className="rounded-full bg-teal-500 p-2"
                            onClick={() => setIsMenuToggled(!isMenuToggled)}>
                            <Bars3Icon className="h-6 w-6 text-white" />
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/*Mobile Menu*/}
        {!isAboveMediumScreens && isMenuToggled && (
            <div className="fixed right-0 bottom-0 z-40 h-full bg-teal-600 w-[300px] drop-shadow-xl">
                <div className="flex justify-end p-12">
                    <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <XMarkIcon className="h-6 w-6 text-white" />
                    </button>
                </div>
                <div className="ml-[33%] flex flex-col gap-10 text-2xl text-white">
                    <HashLink page="HOME"
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage} />
                    <HashLink page="QUANTUM"
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage} />
                    <HashLink page="PROJECT"
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage} />
                    <HashLink page="DEMO"
                        selectedPage={selectedPage}
                        setSelectedPage={setSelectedPage} />
                </div>
            </div>
        )}

    </nav>;

};
