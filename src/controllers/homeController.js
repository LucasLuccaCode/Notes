const Notes = require("../models/Notes")

exports.index = async (req, res) => {
  try {
    const notes = await Notes.getNotes()
    res.render("home", { notes })
    return
  } catch (err) {
    console.log(err)
    res.send("Erro ao acessar página.")
  }
}