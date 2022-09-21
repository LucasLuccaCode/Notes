const Notes = require("../models/Notes")
const Recents = require("../models/Recents")

exports.viewNote = async (req, res) => {
  const _id = req.params.id
  const note = await Notes.getNote(_id)
  const recents = new Recents(note._id)
  await recents.register()
  res.render("view-note", { 
    note, 
    menu: req.session.menu 
  })
}

exports.form = async (req, res) => {
  const { action, id } = req.query
  if (id) {
    const note = await Notes.getNote(id)
    res.render("form-note", { 
      action, 
      id, 
      note, 
      menu: req.session.menu 
    })
    return
  }
  res.render("form-note", { 
    action, 
    id, 
    menu: req.session.menu 
  })
}

exports.register = async (req, res) => {
  try {
    const note = new Notes(req.body)
    await note.register()
    res.redirect("/")
    return
  } catch (err) {
    console.log(err)
    res.redirect("back")
  }
}

exports.update = async (req, res) => {
  try {
    const note = new Notes(req.body)
    await note.update(req.query.id)
    res.redirect("/")
    return
  } catch (err) {
    console.log(err)
    res.redirect("back")
  }
}

exports.delete = async (req, res) => {
  try {
    await Notes.delete(req.query.id)
    await Recents.delete(req.query.id)
    res.redirect("/")
    return
  } catch (err) {
    console.log(err)
    res.redirect("back")
  }
}

exports.favorite = async (req, res) => {
  const isFavorite = await Notes.toggleFavorite(req.query.id)
  if(isFavorite == null) return res.redirect("back")
  isFavorite ? ++req.session.menu.favorites : --req.session.menu.favorites
  res.redirect("back")
}