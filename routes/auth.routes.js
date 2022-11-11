const router = require("express").Router();
const User = require('../models/User.model')
const bcrypt= require("bcryptjs")

//POST "/api/auth/signup" => registro de usuario
router.post("/signup", async (req, res, next)=> {
    
    console.log(req.body)
    const {firstName, lastName, email, password} = req.body

    //1. validaciones de backend
    if(!email || !password){
        res.status(400).json({errorMessage: "Please fill out all the fields"})
        return;
    }

    //validar fuerza de la contraseña
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if(passwordRegex.test(password)=== false){
        res.status(406).json({errorMessage:"Your password does not match our requirements: Min 8 characthers, 1 uppercase letter, 1 number" })
        return;
    }

    try{
    // validar que el usuario y el email sean únicos
    const foundUser=await User.findOne({email: email})
    if(foundUser !== null){
        res.status(302).json({errorMessage: "The email already exists"})
    return;
    }
    
    
    
    //2. codificar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword        
    }

    //3. crear usuario
    await User.create(newUser)

    //4. enviar mensaje de OK al frontend
    res.status(201).json("Registered user")

    } catch(error){
        next(error)
    }
})


//POST "/api/auth/login" => validación de credenciales del usuario
router.post("/login", async(req,res,next)=> {
    const {firstName, lastName, email, password} = req.body
    
    //1. validaciones de backend
    if(!email || !password){
        res.status(400).json({errorMessage: "Please fill out all the fields"})
        return;
    }

    try{


    }catch(error){
        next(error)
    }

    
    res.status(200).json("todo bien por aquí")
})



//GET "api/auth/verify" => 




module.exports = router;
