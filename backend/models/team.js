const mongoose=require("mongoose");

const teamSchema = mongoose.Schema({

    teamName:String,
    teamOwner:String,
    teamStaduim:String,
    teamFoundation:String
}) ;

const team = mongoose.model("Team",teamSchema);

module.exports= team ;

