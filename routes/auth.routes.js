const router = require("express").Router();
const User = require('../models/User.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const isAuthenticated = require("../middlewares/auth.middlewares")

//POST "/api/auth/signup" => registro de usuario
router.post("/signup", async (req, res, next) => {

    console.log(req.body)
    const { firstName, lastName, email, password } = req.body

    //1. validaciones de backend
    if (!email || !password) {
        res.status(400).json({ errorMessage: "Please fill out all the fields" })
        return;
    }

    //validar fuerza de la contraseña
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (passwordRegex.test(password) === false) {
        res.status(406).json({ errorMessage: "Your password does not match our requirements: Min 8 characthers, 1 uppercase letter, 1 number" })
        return;
    }

    try {
        // validar que el usuario y el email sean únicos
        const foundUser = await User.findOne({ email: email })
        if (foundUser !== null) {
            res.status(302).json({ errorMessage: "The email already exists" })
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

    } catch (error) {
        next(error)
    }
})


//POST "/api/auth/login" => validación de credenciales del usuario
router.post("/login", async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body

    //1. validaciones de backend
    if (!email || !password) {
        res.status(400).json({ errorMessage: "Please fill out all the fields" })
        return;
    }

    try {

        const foundUser = await User.findOne({ email: email })
        console.log(foundUser)
        if (foundUser === null) {
            res.status(400).json({ errorMessage: "Wrong email or password" })
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password)
        console.log("isPasswordValid", isPasswordValid)
        if (isPasswordValid === false) {
            res.status(400).json({ errorMessage: "Wrong email or password" })
            return;
        }

        //2. creación de sesión (TOKEN) y enviarlo al cliente
        const payload = {
            _id: foundUser._id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
            role: foundUser.role,
        }

        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            { algorithm: "HS256", expiresIn: "4h" }
        )
        res.status(200).json({ authToken: authToken })
    } catch (error) {
        next(error)
    }
})



//GET "api/auth/verify" => 
router.get("/verify", isAuthenticated, (req, res, next) => {
    console.log(req.payload)
    res.status(200).json({ user: req.payload })
})




module.exports = router;
