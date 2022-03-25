import {Note, NoteModels} from '../models/note.models.js';
import {response} from  '../../../response/response.js';

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
    try {
      let allNotes = noteModel.all();
      response.succes(req, res, allNotes, 200);
    } catch (error) {
      let errorMessage = error
      response.error(req, res, errorMessage, 500)
    }
  }

  /**
   * Metodo para para responder la ruta => obtener una nota por id
   * @param {*} req request de la peticion
   * @param {*} res respons de la peticion
   */
  getIdNote(req, res){
    try {
      let id = req.params.id;
      let note = noteModel.findById(id)

      response.succes(req, res, note, 200);
    } catch (error) {
      let errorMessage = error
      response.error(req, res, errorMessage, 500)
    }
  }

  /**
   * Metodo para para responder la ruta => update una nota
   * @param {*} req request de la peticion
   * @param {*} res respons de la peticion
   */
  updateNote(req, res){
    try {
      let id = req.params.id;
      let {title, content, status} = req.body;
      let result = noteModel.update(id, title, content, status)
      if (result){
        let messageSucces = "Update Success";
        response.succes(req, res, messageSucces, 200);
      }else{
        let messageError = "Error user not found";
        response.error(req, res, messageError, 500)
      }
    } catch (error) {
      let errorMessage = error
      response.error(req, res, errorMessage , 500)
    }
  }

  /**
   * Metodo para responder la ruta => crear nueva nota
   * @param {*} req request de la peticion
   * @param {*} res respons de la peticion
   * @returns retorna el resultado
   */
  async createNewNote(req,res){
    let {title, content, status} = req.body;
    if (title !== undefined && content !== undefined && status !== undefined){
      try {
        const NewNote = new Note(title, content, status);
        let result = await noteModel.save(NewNote);
        if (result === 0){
          let messageError = 'Error not created note';  
          response.error(req, res, messageError, 500)
        }else{
          let messageSucces = 'Created Success'
          response.succes(req, res, messageSucces, 200)
        }
      } catch (error) {
        let errorMessage = error
        response.error(req, res, errorMessage , 500)
      }
    }else {
      let errorMessage = 'Error data is undefined'
      response.error(req, res, errorMessage, 500)
    }
  }

  /**
   * Metodo para responder la ruta => eliminar las nota
   * @param {*} req request de la peticion
   * @param {*} res respons de la peticion
   */

  deleteNote(req, res){
    try {
      let id = req.params.id;
      let result = noteModel.delete(id);
      response.error(req, res, result, 500)
    } catch (error) {
      let errorMessage = error
      response.error(req, res, errorMessage , 500)
    }
  }


}