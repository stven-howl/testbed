import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("/layer1", "routes/layer1_page.tsx"),
] satisfies RouteConfig;

