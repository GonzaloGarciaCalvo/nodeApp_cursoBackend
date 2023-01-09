const ProductosDaoMongo = require('./ProductosDaoMongo')
const ProductosDaoArchivo = require('./ProductosDaoArchivo')
const {selector} = require('../../config')

let productosDao;

  switch (selector) {

    case 'mongoDB':{
    productosDao = new ProductosDaoMongo()
    }
    break;

    case 'archivo':{
      productosDao = new ProductosDaoArchivo()
    }
    }

    const getProductosDao = productosDao

    module.exports = getProductosDao