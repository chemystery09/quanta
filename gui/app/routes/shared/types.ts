import type { JSX } from "react/jsx-dev-runtime";


export enum SelectedPage{
    Home = "home",
    Quantum = "quantum",
    Project = "project",
    Demo = "demo",
}

export interface QuantumType{
    icon: JSX.Element;
    title: string;
    description: string;
}

export interface ProjectFeatureType{
    name: string;
    description: string;
    image: string;
}