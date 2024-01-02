const mongoose=require('mongoose');
const schema=mongoose.Schema;

const noteSchema=new schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{
    timestamps:true
})
module.exports=mongoose.model("skills",noteSchema);