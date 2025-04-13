import React from 'react'
import {
    HomeModernIcon, 
    UserGroupIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import { SelectedPage } from "../../shared/types.ts"
import HText from "../../shared/HText.tsx"

type Props = {
    setSelectedPage: (value: SelectedPage) => void;

};

const Quantum = ({setSelectedPage}: Props) => {
  return (
    <section id="benefits" className="mx-auto min-h-full w-5/6 py-20">
        <motion.div
            onViewportEnter={() => setSelectedPage(SelectedPage.Quantum)}
        >
            <div>  
                <div>
                    <HText>MORE THAN JUST GAY.</HText>
                </div>
            </div>
        </motion.div>
    </section>
  )
};

export default Quantum;