const Notes = require("../models/Notes")

exports.index = async (req, res) => {
  try {
    const notes = await Notes.getNotes()
    res.render("home", { notes, nav: "all" })
    return
  } catch (err) {
    console.log(err)
    res.send("Erro ao acessar página.")
  }
}