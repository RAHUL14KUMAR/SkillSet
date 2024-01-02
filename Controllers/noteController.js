const expressAsyncHandler=require('express-async-handler')
const Note=require('../Schema/Note');

const postNote=expressAsyncHandler(async(req,res)=>{
    try{
        const {title,content}=req.body;
        const {_id}=req.user;
        if(!title || !content){
            return res.status(400).json("please enter title and description both to the note");
        }
        if(!_id){
            return res.status(403).json("to post you have to login")
        }
        const note=await Note.create({
            title:title,
            content:content,
            author:req.user._id
        })
        res.status(200).json(note)
    }catch(error){
        res.status(500).json(error);
    }
})

// get all notes information including its author details
const getNote=expressAsyncHandler(async(req,res)=>{
    try{
        const note=await Note.find({}).populate("author")
        if(!note.length>=0){
            return res.status(201).json("no note has been posted yet")
        }
        res.status(200).json(note)
    }catch(error){
        console.log("note error",error)
        res.status(500).json(error);
    }
})

// login user get all notes that he/she posted
const getNoteForLoggedInUser=expressAsyncHandler(async(req,res)=>{
    try{
        const {_id}=req.user;
        const note=await Note.find({author:_id}).select("-author");
        if(!note){
            return res.status(201).json("you has not post any note")
        }
        res.status(200).json(note);
    }catch(error){
        res.status(500).json(error);
    }
})

// get particular note by information
const getNoteById=expressAsyncHandler(async(req,res)=>{
    try{
        const id=req.params.id
        const note =await Note.findById(id).populate("author")
        if(note){
            return res.status(200).json(note)
        }else{
            return res.status(201).json(`no note has been found with id -> ${id}`)
        }
    }catch(error){

    }
})

// actual note owner can only update his/her post
// other than note owner no one has right to update the notes which was not posted by him.
const updateNote=expressAsyncHandler(async(req,res)=>{
    try{
        const id=req.params.id;
        const {_id}=req.user;

        const note=await Note.findById(id);
        if(!note){
            return res.status(403).json(`Note with this id-> ${id} is not has been created /posted yet`)
        }else if(JSON.stringify(note.author)===JSON.stringify(_id)){
            const newNote= await Note.findByIdAndUpdate(id,{$set:req.body},{new:true});
            await newNote.save();
            return res.status(200).json("your note hase been updated")
        }else{
            return res.status(403).json(`you are not the correct user to update this note having id-> ${id}`)
        }
    }catch(error){
        res.status(500).json(error);
    }
})

// actual note owner has right to delete his/her note
// apart from noteowner no body has right to delete other note
const deleteNote=expressAsyncHandler(async(req,res)=>{
    try{
        const id=req.params.id;
        const {_id}=req.user;

        const note=await Note.findById(id);
        if(!note){
            return res.status(403).json(`Note with this id-> ${id} is not has been created /posted yet`)
        }else if(JSON.stringify(note.author)===JSON.stringify(_id)){
            const note=await Note.findByIdAndDelete(id);
            return res.status(200).json(`your note with id->${id} is been deleted`)
        }else{
            return res.status(403).json(`you are not the correct user to delete this note having id-> ${id}`)
        }
    }catch(error){
        return res.status(500).json(error);
    }
})

module.exports={
    postNote,
    getNote,
    getNoteById,
    getNoteForLoggedInUser,
    updateNote,
    deleteNote
}