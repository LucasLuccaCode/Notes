const Notes = require("../models/Notes")

exports.viewNote = async (req, res) => {
  const _id = req.params.id
  const note = await Notes.getNote(_id)
  res.render("viewNote", { note })
}

exports.form = (req, res) => {
  const action = req.query.action
  console.log(action)
  res.render("formNote", { action })
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