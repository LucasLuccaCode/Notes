const express = require("express")
const router = express.Router()

//Controllers
const homeControllers = require("./src/controllers/homeControllers")
const noteControllers = require("./src/controllers/noteControllers")

//Routes Home
router.get("/", homeControllers.index)


//Routes Note
router.get("/note/:id", noteControllers.viewNote)

module.exports = router