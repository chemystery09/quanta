import type { Route } from "./+types/home";
import { useState } from "react";
import Landing from "./landing";
import Real from "./real";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "QNanoFEA" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Landing />;
}
