const express = require("express")
const router = express.Router()

//Middlewares
const { setCsrfToken } = require("./src/middlewares/csrfMiddlewares")

//Controllers
const homeController = require("./src/controllers/homeController")
const noteController = require("./src/controllers/noteController")
const navController = require("./src/controllers/navController")

//Routes Home
router.get("/", homeController.index)


//Routes Note
router.get("/note/view/:id", noteController.viewNote)
router.get("/note/form", setCsrfToken, noteController.form)
router.post("/note/form/register", noteController.register)
router.post("/note/form/update", noteController.update)
router.get("/note/delete", noteController.delete)
router.get("/note/favorite", noteController.favorite)

//Routes Nav
router.get("/nav/favorites", navController.favorites)
router.get("/nav/recents", navController.recents)
router.get("/nav/settings", navController.settings)

module.exports = router