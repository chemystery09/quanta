import React from 'react'
import {
    HomeModernIcon, 
    UserGroupIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import { type QuantumType, SelectedPage } from "../../shared/types.ts"
import HText from "../../shared/HText.tsx"
import QuantumComponent from "./QuantumComponent.tsx"
import QuantumPageGIF from "../assets/QuantumPageGIF.gif"

const quantums: Array<QuantumType> = [
    {
        icon: <HomeModernIcon className="h-6 w-6" />,
        title: "Quantum",
        description: "This is the description for quantum. I am not sure what to write here. I guess I can write about my socks again."
    },
    {
        icon: <UserGroupIcon className="h-6 w-6" />,
        title: "Quantum",
        description: "This is the description for quantum. I am not sure what to write here. I guess I can write about my socks again."
    },
    {
        icon: <AcademicCapIcon className="h-6 w-6" />,
        title: "Quantum",
        description: "This is the description for quantum. I am not sure what to write here. I guess I can write about my socks again."
    }
]

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 },
    },
}

type Props = {
    setSelectedPage: (value: SelectedPage) => void;

};

const Quantum = ({setSelectedPage}: Props) => {
  return (
    <section id="quantum" className="mx-auto min-h-full w-5/6 py-20">
        <motion.div
            onViewportEnter={() => setSelectedPage(SelectedPage.Quantum)}
        >
            {/* HEADER: EXPLAIN QUANTUM */}
            <motion.div 
                className="md:my-5 md:w-3/5"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.5}}
                transition={{duration: 0.5}}
                variants={{
                hidden: {opacity: 0, x: -50},
                visible: {opacity: 1, x: 0}
            }}>  
                <HText>MORE THAN JUST GAY.</HText>
                <p className="my-5 text-sm">
                    This is the paragraph where we tell you why quantum is good.
                    I am personally not too sure. Let me tell you about my socks.
                    Most of my socks have holes. I did not make them. My dog likes 
                    to chew on my socks. Perhaps that is why. I have a lot of socks, 
                    but not a lot of dogs. I guess I can forgive my dog.
                </p>
            </motion.div>
            {/* WHY QUANTUM */}
            <motion.div 
                className="md:flex items-center justify-between gap-8 md:flex"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.5}}
                variants={container}
                >
                {quantums.map((quantum: QuantumType) => (
                    <QuantumComponent 
                    key={quantum.title}
                    icon={quantum.icon}
                    title={quantum.title}
                    description={quantum.description}
                    />

                ))}
            </motion.div>

            <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
                <img className="mx-auto"
                alt="quantum-page-graphic"
                src={QuantumPageGIF}/>
                <div>
                    {/*TITLE*/}
                    <div className="relative">
                        <div className="before:absolute before:-top-20 before:-left-20 before:z-[1]">   
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{once: true, amount: 0.5}}
                                transition={{duration: 0.5}}
                                variants={{
                                    hidden: {opacity: 0, x: -50},
                                    visible: {opacity: 1, x: 0}
                                }}
                            >
                                <HText>
                                    SOMETHING ABOUT OUR PROBLEM
                                </HText>
                            </motion.div>
                        </div>
                    </div>

                    {/*DESCRIPTION*/}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 0.5}}
                        transition={{delay:0.2,duration: 0.5}}
                        variants={{
                            hidden: {opacity: 0, x: 50},
                            visible: {opacity: 1, x: 0}
                        }}
                        >
                        <p className="my-5">
                            Something about our problem. I don't really know.
                        </p>
                        <p className="mb-5">
                            Something about how our solution solves this problem.
                        </p>
                    </motion.div>

                    {/*NO NEED: BUTTON OR FIND OUT MORE*/}
                </div>
            </div>

        </motion.div>
    </section>
  )
};

export default Quantum;