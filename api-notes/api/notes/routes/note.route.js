import express from 'express';
import { NoteCtl } from '../controller/note.ctl.js';

const routerNote = express.Router();

const noteController = new NoteCtl();


/**
 * @swagger
 * components:
 *  schemas:
 *      Notes:
 *          type: object
 *          properties:
 *              title:
 *                type: string
 *                description: title of note
 *              content:
 *                type: string
 *                description: content of note
 *              status:
 *                type: boolean
 *                description: status of note
 *          required:
 *              - title
 *              - content
 *              - status
 *          example:
 *              title: first note
 *              content: my first note
 *              status: false 
 */ 

/**
 * @swagger
 * /api/v1/note:
 *  get:
 *    summary: return all note
 *    tags: [note]
 *    responses:
 *      200:
 *        description: all notes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Notes'
 */
routerNote.get('/', noteController.getAllNotes);

/**
 * @swagger
 * /api/v1/note/{id}:
 *  get:
 *    summary: return one note
 *    tags: [note]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: note id
 *    responses:
 *      200:
 *        description: one note
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Notes'
 *      404:
 *        description: not found
 */
routerNote.get('/:id', noteController.getIdNote);

/**
 * @swagger
 * /api/v1/note/{id}:
 *  put:
 *    summary: update one note
 *    tags: [note]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: note id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Notes'
 *    responses:
 *      200:
 *        description: update note 
 *      404:
 *        description: not found
 */
routerNote.put('/:id', noteController.updateNote);

/**
 * @swagger
 * /api/v1/note:
 *  post:
 *    summary: create a new note
 *    tags: [note]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Notes'
 *    responses:
 *      200:
 *        description: new note created
 *      404:
 *        description: not found
 */
routerNote.post('/', noteController.createNewNote);

/**
 * @swagger
 * /api/v1/note/{id}:
 *  delete:
 *    summary: delete one note
 *    tags: [note]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: note id
 *    responses:
 *      200:
 *        description: note is deleted
 *      404:
 *        description: not found
 */
routerNote.delete('/:id', noteController.deleteNote);


export default routerNote;