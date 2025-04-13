import React from 'react'
import { Link } from 'react-router-dom';
import {SelectedPage} from "../../shared/types.ts"
import ActionButtonProject from "../../shared/ActionButtonProject.tsx"
import useMediaQuery from "../../hooks/useMediaQuery.ts"
import HomePageText from "../assets/HomePageText.png"
import HomePageGraphic from "../assets/HomePageGIF.gif"
import {motion} from "framer-motion"

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

function Home({setSelectedPage}: Props) {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  return <section
    id="home"
    className="gap-16 bg-teal-50 py-10 md:h-full">
    {/*Image Section*/}
    <motion.div 
        className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
    >
        {/*Main header*/}
        <div className="z-10 mt-32 md:basis-3/5">
            {/*Title*/}
            <motion.div 
            className="md:-mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.5}}
            transition={{duration: 1.0}}
            variants={{
                hidden: {opacity: 0, x: -50},
                visible: {opacity: 1, x: 0}
            }}
            >   
                <div className="relative">
                    <div className="before:absolute before:-top-20">
                        <img alt="home-page-text" src={HomePageText}/>
                    </div>
                </div>

                <p className = "mt-8 text-sm">
                    Quanta utilizes finite element analysis (FEA) and quantum computing to simulate the behavior of nanomaterials under pressure, enabling groundbreaking advancements in engineering and science.
                </p>
            </motion.div>
            <motion.div 
            className="mt-8 flex items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.5}}
            transition={{duration: 1.0}}
            variants={{
                hidden: {opacity: 0, x: -50},
                visible: {opacity: 1, x: 0}
            }}>
                <ActionButtonProject setSelectedPage={setSelectedPage}>
                    Learn More
                </ActionButtonProject>
                {/*<Link className="text-sm font-bold text-primary-500 underline hover: text-secondary-500"
                onClick = {() => setSelectedPage(SelectedPage.Project)}
                to={`#${SelectedPage.Project}`}
                > <p>We don't need this</p>
                </Link>*/}
                <p>
                    <a href="https://www.dinocasino.games/games/lobby">
                        I don't need this
                    </a>
                </p>
            </motion.div>
        </div>
        <div className="flex basis-3/5 justify-center md:z-10 md:ml-40 md:mt-16 md:justify-items-end">
            <img alt="home-pageGraphic" src={HomePageGraphic}/>
        </div>
    </motion.div>
    {/*Sponsors if we want any*/}
  </section>;
}

export default Home