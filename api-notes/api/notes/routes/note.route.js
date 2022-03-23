import express from 'express';

const routerNote = express.Router();

/**
 * ruta para obtener todas las notas
 */
routerNote.get('/', (req, res)=>{
  res.json({menssage: "this is route GET"});
});

/**
 * ruta para obtener solo una nota
 */
routerNote.get('/:id', (req, res)=>{
  res.json({menssage: "this is route GET one element"})
});

/**
 * ruta para hacer PUT
 */
routerNote.put('/', (req, res)=>{
    res.json({menssage: "this is route PUT"})
});

/**
 * ruta para hacer POST
 */
routerNote.post('/', (req, res)=>{
    res.json({menssage: "this is route POST"})
});

/**
 * ruta para hacer DELETE
 */
routerNote.delete('/',(req, res)=>{
    res.json({menssage: "this is route DELETE"})
})


export default routerNote;