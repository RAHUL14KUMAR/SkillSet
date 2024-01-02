const express=require('express');
const protect=require('../middlewares/authMiddleware');
const { postNote, getNote, getNoteForLoggedInUser, updateNote, getNoteById, deleteNote } = require('../Controllers/noteController');

const router=express.Router()

router.route('/')
.post(protect,postNote)
.get(getNote)

router.route('/:id')
.put(protect,updateNote)
.get(getNoteById)
.delete(protect,deleteNote)

router.route('/notes')
.get(protect,getNoteForLoggedInUser)

module.exports=router;