const mongoose = require("mongoose")

const NotesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  favorite: { type: Boolean, required: true }
})

const NotesModel = mongoose.model("Notes", NotesSchema)

class Notes {
  constructor(body) {
    this.data = body
  }
  async register() {
    this.validate()
    await NotesModel.create(this.data)
  }
  async update(_id) {
    this.validate()
    await NotesModel.updateOne({ _id }, { $set: this.data })
  }
  validate() {
    this.cleanUp()
  }
  cleanUp() {
    this.data = {
      title: this.data.title,
      description: this.data.description,
      date: (new Date()).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
      favorite: false
    }
  }
  static async delete(_id) {
    await NotesModel.deleteOne({ _id })
  }
  static async getNotes(ids) {
    try {
      if (!ids) return await NotesModel.find()
      return await NotesModel.find({ _id: { $in: ids } })
    } catch (err) {
      console.log(err)
      return []
    }
  }
  static async getFavorites() {
    try {
      return await NotesModel.find({ favorite: true })
    } catch (err) {
      console.log(err)
      return []
    }
  }
  static async toggleFavorite(_id) {
    try {
      const isFavorite = (await NotesModel.findOne({ _id })).favorite
      await NotesModel.updateOne({ _id }, { $set: { favorite: !isFavorite } })
      return !isFavorite
    } catch (err) {
      console.log(err)
      return null
    }
  }
  static async getNote(_id) {
    try {
      return await NotesModel.findOne({ _id: _id })
    } catch (err) {
      console.log(err)
      return null
    }
  }
  static async search(text) {
    try {
      return await NotesModel.find({ $text: { $search: text } })
      // return await NotesModel.find({ title: { $regex: text } })
    } catch (err) {
      console.log(err)
      return []
    }
  }
}

module.exports = Notes