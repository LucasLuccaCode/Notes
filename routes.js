const express = require("express")
const router = express.Router()

//Controllers
const homeController = require("./src/controllers/homeController")

router.get("/", homeController)

module.exports = router