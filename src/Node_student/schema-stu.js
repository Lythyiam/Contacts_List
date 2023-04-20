const mongoose = require ("mongoose");

const contactschema= new mongoose.Schema({
    firstname: String,
    name: String,
    age: Number,
    email: String
},{
    capped: { size: 1024 },
   // bufferCommands: false,
   // autoCreate: false // disable `autoCreate` since `bufferCommands` is false
  
})
// Exportation de notre module nous permettant de definir les chemin d'accès
module.exports = mongoose.model("Contact",contactschema);