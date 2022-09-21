const Notes = require("../models/Notes")
const Recents = require("../models/Recents")

const getMenuData = async () => {
  const notes = await Notes.getNotes()
  const favorites = await Notes.getFavorites()
  const recents = await Recents.getRecents()
  return {
    menu: {
      total: notes.length,
      favorites: favorites.length,
      recents: recents.length,
    },
    notes
  }
}

exports.index = async (req, res) => {
  try {
    const { menu, notes } = await getMenuData()
    req.session.menu = menu
    res.render("home", {
      notes,
      nav: "all",
      menu
    })
    return
  } catch (err) {
    console.log(err)
    res.send("Erro ao obter os dados das notas.")
  }
}