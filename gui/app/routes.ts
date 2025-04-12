import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/real", "routes/real.tsx"),
    route("/three", "routes/three.tsx"),
] satisfies RouteConfig;
