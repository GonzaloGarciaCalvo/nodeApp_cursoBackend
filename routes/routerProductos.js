const express = require('express');
const { Router } = express;

const prod = require('../api/productos')

const routerProductos = new Router();
routerProductos.use(express.json());
routerProductos.use(express.urlencoded({ extended: true }));

const {
    saveController, 
  getAllcontroller, 
  getByIdController, 
  updateController,
  deletecontroller
} = require('../controllers/productos')

//Save
routerProductos.post('/', saveController)

//Getall
routerProductos.get('/', getAllcontroller)

//GetbyId
routerProductos.get("/:id", getByIdController)


//Update
routerProductos.put('/:id',updateController)

//Delete
routerProductos.delete('/:id',deletecontroller)

module.exports = routerProductos