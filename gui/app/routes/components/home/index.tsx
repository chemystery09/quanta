import React from 'react'
import { Link } from 'react-router-dom';
import {SelectedPage} from "../../shared/types.ts"
import ActionButtonProject from "../../shared/ActionButtonProject.tsx"
import useMediaQuery from "../../hooks/useMediaQuery.ts"
import HomePageText from "../assets/HomePageText.png"
import HomePageGraphic from "../assets/HomePageGraphic.png"
import {motion} from "framer-motion"

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

function Home({setSelectedPage}: Props) {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  return <section
    id="home"
    className="gap-16 bg-purple-50 py-10 md:h-full">
    {/*Image Section*/}
    <div className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6">
        {/*Main header*/}
        <div className="z-10 mt-32 md:basis-3/5">
            {/*Title*/}
            <motion.div 
            className="md:-mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.5}}
            transition={{duration: 0.5}}
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
                    A short description about our project, which I am not 
                    too sure what it is about. Let me tell you about peaches.
                    I really like peaches. When I was nine, my aunt packed me 
                    a suitcase full of peaches and immigration thought they 
                    were grenades.
                </p>
            </motion.div>
            <div className="mt-8 flex items-center gap-8">
                <ActionButtonProject setSelectedPage={setSelectedPage}>
                    Learn More
                </ActionButtonProject>
                <Link className="text-sm font-bold text-primary-500 underline hover: text-secondary-500"
                onClick = {() => setSelectedPage(SelectedPage.Project)}
                to={`#${SelectedPage.Project}`}
                > <p>We don't need this</p>
                </Link>
            </div>
        </div>
        <div className="flex basis-3/5 justify-center md:z-10 md:ml-40 md:mt-16 md:justify-items-end">
            <img alt="home-pageGraphic" src={HomePageGraphic}/>
        </div>
    </div>
    {/*Sponsors if we want any*/}
  </section>;
}

export default Home