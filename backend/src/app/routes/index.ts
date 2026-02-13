import { Router } from "express";
import { AuthRoutes } from "./auth.route";

export const router = Router();

const apiRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

apiRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
