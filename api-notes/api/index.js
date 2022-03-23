import { Server } from "./server.js";
import {config} from "../config/default.js";

function main(hostname, port, name){
  const srv = new Server(hostname, port, name);
  srv.initServer();
}


main(config.api.host, config.api.port, config.api.app);