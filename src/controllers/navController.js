const Notes = require("../models/Notes")
const Recents = require("../models/Recents")

exports.favorites = async (req, res) => {
  const favorites = await Notes.getFavorites()
  if (favorites.length) {
    res.render("home", { notes: favorites, nav: "favorites" })
    return
  }
  res.send(`<a href="/">Voltar</a><br><p>Nenhum favorito adicionado</p>`)
}

exports.recents = async (req, res) => {
  const recents = await Recents.getRecents()
  if (recents.length) {
    const recentsIds = recents.map(({ note_id }) => note_id)
    const recentsNotes = await Notes.getNotes(recentsIds)
    res.render("home", { notes: recentsNotes, nav: "recents" })
    return
  }
  res.send(`<a href="/">Voltar</a><br><p>Nenhum nenhuma nota recente salva ainda...</p>`)
}

exports.settings = (req, res) => {
  res.render("settings", { nav: "settings" })
}