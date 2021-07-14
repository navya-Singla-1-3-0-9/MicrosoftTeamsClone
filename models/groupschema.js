const  mongoose  = require("mongoose");
const  Schema  =  mongoose.Schema;
const  groupSchema  =  new Schema({
   name: String,
   members: [String],
   created_by: String
});

let  Group  =  mongoose.model("Group", groupSchema);
module.exports  = Group;