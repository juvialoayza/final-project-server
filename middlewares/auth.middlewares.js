const { expressjwt: jwt } = require("express-jwt");

const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload",
    getToken: (req) => {
        console.log(req.headers)

        if (req.headers === undefined || req.headers.authorization === undefined) {
            console.log("No hay token")
            return null
        }

        const tokenArr = req.headers.authorization.split(" ")
        const tokenType = tokenArr[0]
        const token = tokenArr[1]

        if (tokenType !== "Bearer") {
            console.log("Tipo de token incorrecto")
            return null;
        }

        console.log("token recibido")
        return token
    }
})

const isAdmin = (req, res, next) => {
    if (req.payload.role !== "admin") {
        res.status(401).json("no tienes acceso")
    } else {
        next()
    }
}



module.exports = {
    isAuthenticated,
    isAdmin
}