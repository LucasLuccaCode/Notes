const Notes = require("../models/Notes")

module.exports = async (req, res) => {
  const notes = await Notes.search(req.body.text)
  res.render("home", {
    nav: "search",
    notes,
    menu: req.session.menu
  })
}