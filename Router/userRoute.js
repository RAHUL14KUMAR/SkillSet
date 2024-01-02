const express=require('express');
const { register, login, profile } = require('../Controllers/userController');
const protect=require('../middlewares/authMiddleware')
const router=express.Router()

router.route('/register')
.post(register)

router.route('/login')
.post(login)

router.route('/profile')
.get(protect,profile)

module.exports=router;