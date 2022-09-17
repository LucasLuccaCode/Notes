const mongoose = require("mongoose")

const NotesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true }
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
      date: (new Date()).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }
  }
  static async delete(_id) {
    await NotesModel.deleteOne({ _id })
  }
  static async getNotes() {
    try {
      return await NotesModel.find()
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