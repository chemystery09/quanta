import React from 'react'
import type { JSX } from "react/jsx-dev-runtime";
import { motion } from "framer-motion";

const childVariant ={
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

type Props = {
    icon: JSX.Element;
    title: string;
    description: string;
}

const QuantumComponent = ({icon,title,description}: Props) => {
  return (
    <motion.div 
      variants={childVariant}
      className="mt-5 rounded-md border-2 border-gray-200 px-5 py-16 text-center shadow-lg hover:shadow-xl hover:shadow-teal-100 transition duration-500 ease-in-out">
        <div className="mb-4 flex justify-center">
            <div className="rounded-full border-2 border-teal-600 bg-primary-100 p-4 text-teal-600">  
                {icon}
            </div>
        </div>
        <h4 className="font-bold">{title}</h4>
        <p className="my-3">{description}</p>
    </motion.div>
  );
};

export default QuantumComponent