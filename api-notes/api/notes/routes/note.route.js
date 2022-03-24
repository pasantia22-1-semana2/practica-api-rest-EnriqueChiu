import express from 'express';
import { NoteCtl } from '../controller/note.ctl.js';

const routerNote = express.Router();

const noteController = new NoteCtl();

/**
 * ruta para obtener todas las notas
 */
routerNote.get('/', noteController.getAllNotes);

/**
 * ruta para obtener solo una nota
 */
routerNote.get('/:id', noteController.getIdNote);

/**
 * ruta para hacer PUT
 */
routerNote.put('/', noteController.updateNote);

/**
 * ruta para hacer POST
 */   
routerNote.post('/', noteController.createNewNote);

/**
 * ruta para hacer DELETE
 */
routerNote.delete('/', noteController.deleteNote);


export default routerNote;