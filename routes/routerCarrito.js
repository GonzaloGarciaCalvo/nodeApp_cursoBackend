const express = require('express');
const { Router } = express;
const auth = require('../middleware/auth')

const {
  getCartsController,
  getCartByIdController,
  createCartcontroller,
  deleteCartController,
  saveProdInCart,
  deleteProdFromCart
} = require('../controllers/controller-carritos')

const routerCarrito = new Router();  
routerCarrito.use(express.json());
routerCarrito.use(express.urlencoded({ extended: true }));

//getall
routerCarrito.get('/', auth, getCartsController)

// POST crea 1 carrito
routerCarrito.post("/", createCartcontroller);

// Delete borra 1 carrito completo
routerCarrito.delete("/:id", deleteCartController);

// GET lista de productos de 1 carrito  
routerCarrito.get("/:id/productos", getCartByIdController);

// POST guardar 1 producto en 1 carrito
routerCarrito.post("/:id/productos", saveProdInCart);

// DELETE borra 1 producto de 1 carrito
routerCarrito.delete("/:id/productos/:id_prod", deleteProdFromCart);

module.exports = routerCarrito