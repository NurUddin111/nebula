"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const routes_1 = require("./app/routes");
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./app/config/env");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "5mb" }));
app.use((0, cookie_parser_1.default)());
// app.get("/", (req: Request, res: Response) => {
//   res.status(200).json({
//     message: "Welcome to Nebula!",
//   });
// });
app.use("/api/v1", routes_1.router);
// make ready for deployment
// if (envVars.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../../frontend")));
//   app.get("/{*any}", (_, res: Response) => {
//     res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
//   });
// }
if (env_1.envVars.NODE_ENV === "production") {
    const frontendPath = path_1.default.join(__dirname, "../../frontend/dist");
    app.use(express_1.default.static(frontendPath));
    app.get("/{*any}", (_, res) => {
        res.sendFile(path_1.default.join(frontendPath, "index.html"));
    });
}
exports.default = app;
