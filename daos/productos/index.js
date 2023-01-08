const ProductosDaoMongo = require('./ProductosDaoMongo')
const ProductosDaoArchivo = require('./ProductosDaoArchivo')


let productosDao;
let selector;
selector = 'mongoDB'

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