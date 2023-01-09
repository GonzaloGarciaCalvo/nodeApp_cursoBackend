const OrdenesDaoMongo = require('./OrdenesDaoMongo')
const OrdenesDaoArchivo = require('./OrdenesDaoArchivo')
const {selector} = require('../../config')

let ordenesDao;

  switch (selector) {

    case 'mongoDB':{
    ordenesDao = new OrdenesDaoMongo()
    }
    break;

    case 'archivo':{
      ordenesDao = new OrdenesDaoArchivo()
    }
    }

    const getOrdenesDao = ordenesDao

    module.exports = getOrdenesDao