import { Server } from "./server.js";
import {config} from "../config/default.js";


/**
 * Funcion main para inicial un nuevo servidor
 * @param {*} hostname el hostname de servidor  
 * @param {*} port el puerto donde se va a levantar el servidor
 * @param {*} name el nombre de la api
 */
function main(hostname, port, name){
  const srv = new Server(hostname, port, name);
  srv.initServer();
}


main(config.api.host, config.api.port, config.api.app);