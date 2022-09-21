const Notes = require("../models/Notes")
const Recents = require("../models/Recents")

exports.favorites = async (req, res) => {
  const favorites = await Notes.getFavorites()
  res.render("home", {
    notes: favorites,
    nav: "favorites",
    menu: req.session.menu
  })
}

exports.recents = async (req, res) => {
  const recents = await Recents.getRecents()
  let recentsNotes = []
  if (recents.length) {
    const recentsIds = recents.map(({ note_id }) => note_id)
    recentsNotes = await Notes.getNotes(recentsIds)
  }
  res.render("home", {
    notes: recentsNotes,
    nav: "recents",
    menu: req.session.menu
  })
}

exports.settings = (req, res) => {
  res.render("settings", {
    nav: "settings",
    menu: req.session.menu
  })
}