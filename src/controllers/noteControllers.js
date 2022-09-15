const Notes = require("../models/Notes")

exports.viewNote = async (req, res) => {
  const _id = req.params.id
  const note = await Notes.getNote(_id)
  res.render("viewNote", { note })
}