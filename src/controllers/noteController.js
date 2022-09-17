const Notes = require("../models/Notes")

exports.viewNote = async (req, res) => {
  const _id = req.params.id
  const note = await Notes.getNote(_id)
  res.render("viewNote", { note })
}

exports.form = async (req, res) => {
  const action = req.query.action
  const id = req.query.id
  if (id) {
    const note = await Notes.getNote(id)
    res.render("formNote", { action, id, note })
    return
  }
  res.render("formNote", { action, id })
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
  const _id = req.query.id
  try {
    const note = new Notes(req.body)
    await note.update(_id)
    res.redirect("/")
    return
  } catch (err) {
    console.log(err)
    res.redirect("back")
  }
}

exports.delete = async (req, res) => {
  const id = req.query.id
  try {
    await Notes.delete(id)
    res.redirect("/")
    return
  } catch (err) {
    console.log(err)
    res.redirect("back")
  }
}