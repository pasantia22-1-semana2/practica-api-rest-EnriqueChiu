import fs, { stat } from 'fs';

/**
 * Clase de note para obtener el titulo y contenido de JSON
 */

export class Note{
  constructor( title, content, status){
    this._id = 0;
    this._title = title;
    this._content = content
    this._status = status;
  }

  get if(){
    return this._id;
  } 
  get title(){
    return this._title;
  }
  get content(){
    return this._content;
  }
  get status(){
    return this._status;
  }

  set id(id){
    this._id = id;
  }
  set title(title){
    this._title = title;
  }
  set content(content){
    this._content = content;
  }
  set status(status){
    this._status = status;
  }
}


/**
 * Clase de note guardar y leer el archivo JSON
 */
export class NoteModels{
  constructor(){
    this._name = 'db';
    this._dataDir = 'db';
    this._dataPath = 'db/db.json';
  }

  /**
   * Metodo para leer un json de una ruta
   * @returns retorna el contenido de json
   */
  readJsonFile(){
    let contentFile = fs.readFileSync(this._dataPath, 'utf-8');
    if (contentFile){
      return JSON.parse(contentFile)
    }
    return [];
  }

  /**
   * Metodo para escribir un json de una ruta
   * @param {*} data parametro que contiene el conetenido de un Json
   */
  writeJsonFile(data){
    let dataJSON = JSON.stringify(data,null, '');
    fs.writeFileSync(this._dataPath, dataJSON)
  }

  /**
   * Metodo para generar un id unique
   * @returns retorna el id de note
   */
  gereratePK(){
    let notes = this.readJsonFile();
    let lastNote = notes.pop();
    if (lastNote){
      return ++lastNote._id;
    }
    return 1;
  }

  /**
   * Metodo para guardar una nota nueva
   * @param {*} note parametro que contiene la nueva nota que se quiere guardar
   * @returns retorna el id si se guardo correctamente, sino retorna 0
   */
  async save(note){
    try{
      let notes = this.readJsonFile();
      note._id = this.gereratePK()
      notes.push(note);
      await this.writeJsonFile(notes);
      return note._id;
    } catch (error){
      console.log(error);
      return 0;
    }
  }

  /**
   * Metodo que retorna el contenido de Json
   * @returns Returna el contendido de Json
   */
  all(){
    return this.readJsonFile();
  }

  /**
   * Metodo para buscar la nota por id
   * @param {*} id el id de la nota que se quiere buscar
   * @returns retorna la nota si se encontro
   */
  findById(id){
    let items = this.readJsonFile();
    let item = items.find((item)=> item._id == id)
    if (item){
      return item
    }
    return {messaje: "Not found"}
  }

  /**
   * Metodo para actualizar una nota
   * @param {*} id el id de la nota que se quiere actualizar
   * @param {*} title el title para actualizar
   * @param {*} content el content para actualizar
   * @param {*} status el status para actualizar
   * @returns retorna true si se actualizo y false si no se actualizo
   */
  update(id, title, content, status){
    let items = this.readJsonFile();
    let item = items.find((item)=> item._id == id)
    if (item){
      let index = this.index(id)
      item._title = title;
      item._content = content;
      item._status = status;
      items[index] = item;
      this.writeJsonFile(items)
      return true
    }
    
    return false
  }

  /**
   * Metodo para buscar la posicion que se encuentra nota dado un id
   * @param {*} id el id de la nota
   * @returns retorna la posicion de la nota
   */
  index(id){
    let items = this.readJsonFile();
    items.find(function(item, index){
      if (item._id == id){
        return index
      }
    });
    return -1;
  }

  /**
   * Metodo para eliminar el contenido de un json
   * @returns retorna un mensaje
   */
  delete(){
    this.writeJsonFile([])
    return {message: "Delete Success"}
  }
}