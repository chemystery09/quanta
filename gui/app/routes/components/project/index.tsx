import React from 'react'
import { SelectedPage, type ProjectFeatureType } from "../../shared/types.ts"
import { motion } from "framer-motion"
import HText from "../../shared/HText.tsx"
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.png"
import ClassicalGraph from "../assets/ClassicalGraph.gif"
import QuantumGraph from "../assets/QuantumGraph.png"
import image3 from "../assets/image3.png"
import mesh from "../assets/mesh.png"
import comparison from "../assets/comparison.webp"
import ProjectFeature from "./ProjectFeature.tsx"

const projectFeatures: Array<ProjectFeatureType> = [
    {
        name: "Step 1",
        description: "Give Quanta details on what you want to model.",
        image: mesh,
    },
    {
        name: "Step 2",
        description: "Quanta pulls real data on the material.",
        image: comparison,
    },
    {
        name: "Step 3",
        description: "The material is represented as a mesh, and finite element analysis is run on it to simulate force.",
        image: image3,
    },
    {
        name: "Step 4",
        description: "Voila! See your model and how it warps under stress. Use this to know how much force your material can take, and how to optimize it for your needs.",
        image: QuantumGraph,
    },
]

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Project = ({setSelectedPage}: Props) => {
  return (
    <section id="project" className="w-full bg-teal-50 mt-40 py-20">
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
                        Quanta uses finite element analysis to model the behavior of nanomaterials under force as differential equations. The differential equations are minimized into a system of linear equations, and then solved using the HHL algorithm on a quantum computer. The displacement is collected and graphed, and results are then used to predict how nanomaterials will react under force, and to optimize their design for specific applications.
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