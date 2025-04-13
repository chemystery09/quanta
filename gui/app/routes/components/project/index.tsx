import React from 'react'
import { SelectedPage, type ProjectFeatureType } from "../../shared/types.ts"
import { motion } from "framer-motion"
import HText from "../../shared/HText.tsx"
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.png"
import image3 from "../assets/image3.png"
import image4 from "../assets/image4.png"
import ProjectFeature from "./ProjectFeature.tsx"

const projectFeatures: Array<ProjectFeatureType> = [
    {
        name: "Step 1",
        description: "This is the description for project. I am not sure what to write here. I guess I can write about my socks again.",
        image: image1,
    },
    {
        name: "Step 2",
        description: "This is the description for project. I am not sure what to write here. I guess I can write about my socks again.",
        image: image2,
    },
    {
        name: "Step 3",
        description: "This is the description for project. I am not sure what to write here. I guess I can write about my socks again.",
        image: image3,
    },
    {
        name: "Step 4",
        description: "This is the description for project. I am not sure what to write here. I guess I can write about my socks again.",
        image: image4,
    },
]

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Project = ({setSelectedPage}: Props) => {
  return (
    <section id="project" className="w-full bg-teal-100 py-40">
        <motion.div
            onViewportEnter={() => setSelectedPage(SelectedPage.Project)}
        >
            <motion.div
                className="mx-auto w-5/6"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.5}}
                transition={{duration: 0.5}}
                variants={{
                    hidden: {opacity: 0, x: -50},
                    visible: {opacity: 1, x: 0},
                }}
            >
                <div className="md:w-3/5">
                    <HText>QUANTUM-ASSISTED NANO-STRUCTURAL ANALYSIS</HText>
                    <p className="py-5">
                        This is the description for project. I am not sure what to write here. I guess I can write about my socks again.
                    </p>
                </div>
            </motion.div>
            <div></div>
        </motion.div>
        <div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
            <ul className="w-[1800px] whitespace-nowrap">
                {projectFeatures.map((item,index) => (
                    <ProjectFeature 
                        key={`${item.name}-${index}`}
                        name={item.name}
                        description={item.description}
                        image={item.image}
                    />
                ))}
            </ul>
        </div>
    </section>
  )
}

export default Project