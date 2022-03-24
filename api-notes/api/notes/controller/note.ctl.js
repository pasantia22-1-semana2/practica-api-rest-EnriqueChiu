import {Note, NoteModels} from '../models/note.models.js';


const noteModel = new NoteModels();

/**
 * Clase para controlar el modulo de Note
 */
export class NoteCtl{
  constructor(){}

  /**
   * Metodo para responder la ruta => obtener todas las notas
   * @param {*} req request de la peticion
   * @param {*} res respons de la peticion
   */
  getAllNotes(req,res){
    let allNotes = noteModel.all();
    res.json(allNotes);  
  }

  /**
   * Metodo para para responder la ruta => obtener una nota por id
   * @param {*} req request de la peticion
   * @param {*} res respons de la peticion
   */
  getIdNote(req, res){
      let id = req.params.id;
      let note = noteModel.findById(id)
      res.json(note)
  }

  /**
   * Metodo para para responder la ruta => update una nota
   * @param {*} req request de la peticion
   * @param {*} res respons de la peticion
   */
  updateNote(req, res){
    let {id, title, content, status} = req.body;
    let result = noteModel.update(id, title, content, status)
    if (result){
      return res.json({message: "Update Success"});
    }
    return res.json({message: "Error Update, id not find"})
  }

  /**
   * Metodo para responder la ruta => crear nueva nota
   * @param {*} req request de la peticion
   * @param {*} res respons de la peticion
   * @returns retorna el resultado
   */
  async createNewNote(req,res){
    let {id, title, content, status} = req.body
    const NewNote = new Note(id, title, content, status);
    let result = await noteModel.save(NewNote);
    if (result > 0){
      return res.json({message : "Created Success"});
    }
    return res.json({message: "Error"});
  }

  /**
   * Metodo para responder la ruta => eliminar las nota
   * @param {*} req request de la peticion
   * @param {*} res respons de la peticion
   */
  deleteNote(req, res){
    let result = noteModel.delete();
    res.json(result);
  }


}