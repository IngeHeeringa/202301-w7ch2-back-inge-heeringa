import { type CustomError } from "../CustomError/CustomError.js";
import app from "./index.js";
import createDebug from "debug";

const debug = createDebug("robots:root");

const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port);
    debug(`Server listening on port ${port}`);

    resolve(server);

    server.on("error", (error: CustomError) => {
      let errorMessage = "Error on starting the server";

      if (error.code === "EADDRINUSE") {
        errorMessage += `The port ${port} is already in use`;
      }

      reject(new Error(errorMessage));
    });
  });

export default startServer;
