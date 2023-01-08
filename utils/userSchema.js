const {Schema, model} = require('mongoose')

const userSchema = new Schema({

    email:{type:String, required:true},
    password:{type:String, required:true},
    name:{type:String, required:true},
    age:{type:Number, required:true},
    phone:{type:Number, required:true},
    address:{type:String, required:true},
    role: { type: String, required: true, default: "user" },
})
const User = model('usuarios',userSchema)
module.exports = User

