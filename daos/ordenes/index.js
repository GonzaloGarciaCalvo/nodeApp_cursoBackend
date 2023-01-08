const OrdenesDaoMongo = require('./OrdenesDaoMongo')
const OrdenesDaoArchivo = require('./OrdenesDaoArchivo')


let ordenesDao;
let selector;
selector = 'mongoDB'



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