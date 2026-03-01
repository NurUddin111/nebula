import { Router } from "express";
import { AuthRoutes } from "./auth.route";
import { arcjetProtection } from "../../middleware/arcjet.middleware";

export const router = Router();

router.use(arcjetProtection);

const apiRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

apiRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
