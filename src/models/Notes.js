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
    if(!ids){
      try {
        return await NotesModel.find()
      } catch (err) {
        console.log(err)
        return null
      }
    }
    try {
      return await NotesModel.find({ _id: { $in: ids }})
    } catch (err) {
      console.log(err)
      return null
    }
  }
  static async getFavorites() {
    try {
      return await NotesModel.find({ favorite: true })
    } catch (err) {
      console.log(err)
      return null
    }
  }
  static async toggleFavorite(_id) {
    try {
      const isFavorite = (await NotesModel.findOne({ _id })).favorite
      if(isFavorite){
        await NotesModel.updateOne({ _id },{ $set: { favorite: false } })
        return
      }
      await NotesModel.updateOne({ _id },{ $set: { favorite: true } })
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
}

module.exports = Notes