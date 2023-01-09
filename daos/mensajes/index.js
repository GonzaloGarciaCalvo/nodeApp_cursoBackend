const MensajesDaoMongo = require('./MensajesDaoMongo')
const {selector} = require('../../config')

let mensajesDao;

  switch (selector) {
    
    case 'mongoDB':{
    mensajesDao = new MensajesDaoMongo()
    }
    break;

    }

    const getOrdenesDao = mensajesDao
    module.exports = getOrdenesDao