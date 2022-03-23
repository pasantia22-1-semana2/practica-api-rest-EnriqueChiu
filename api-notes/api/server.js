import express from "express";

import routerNote from "./notes/routes/note.route.js";

export class Server{
  constructor(hostname, port, nameapp){
    this._hostname = hostname;
    this._port = port;
    this._nameapp = nameapp;
    this._api = express();
    //this.initMiddlawares();
    this.initRoutes();
  }

  initMiddlawares(){
    this._api.use(express.json);
    this._api.use(express.urlencoded({extended:true}));
  }

  initRoutes(){
    this._api.use('/api/v1/note', routerNote)
    this._api.use('/home', (req, res)=>{
      res.json({menssage:"Welcome to my api"})
    })
  }

  initServer(){
    try{
      this._api.set('trust proxy', this._hostname);
      this._api.listen(this._port, ()=>{
        console.log(`Server of ${this._nameapp} running at http://${this._hostname}:${this._port}`)
      });
    } catch (error) {
      console.log(`Error start Server, info error: ${error}`)
    }
  }
}