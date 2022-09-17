const express = require("express")
const router = express.Router()

//Controllers
const homeController = require("./src/controllers/homeController")
const noteController = require("./src/controllers/noteController")

//Routes Home
router.get("/", homeController.index)


//Routes Note
router.get("/note/view/:id", noteController.viewNote)
router.get("/note/form", noteController.form)
router.post("/note/form/register", noteController.register)
router.post("/note/form/update", noteController.update)
router.get("/note/delete", noteController.delete)

module.exports = router