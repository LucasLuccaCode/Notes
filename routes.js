const express = require("express")
const router = express.Router()

//Controllers
const homeController = require("./src/controllers/homeController")
const noteController = require("./src/controllers/noteController")
const navController = require("./src/controllers/navController")
const searchController = require("./src/controllers/searchController")

//Routes Home
router.get("/", homeController.index)


//Routes Note
router.get("/note/view/:id", noteController.viewNote)
router.get("/note/form", noteController.form)
router.post("/note/form/register", noteController.register)
router.post("/note/form/update", noteController.update)
router.get("/note/delete", noteController.delete)
router.get("/note/favorite", noteController.favorite)

//Routes Nav
router.get("/nav/favorites", navController.favorites)
router.get("/nav/recents", navController.recents)
router.get("/nav/settings", navController.settings)

router.post("/search", searchController)

module.exports = router