const express = require("express");
const server = express();
const projectRouter = require("./routers/projectRouter.js");
server.use(express.json());
server.use("/api/projects", projectRouter);

const port = process.env.port || 8000;

server.listen(port, console.log(`Listening on port ${port}`));
