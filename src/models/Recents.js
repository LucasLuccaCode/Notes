const mongoose = require("mongoose")
const Notes = require("../models/Notes")

const recentSchema = new mongoose.Schema({
  note_id: { type: String, required: true }
})

const RecentModel = mongoose.model("Recents", recentSchema)

class Recents {
  constructor(note_id) {
    this.note_id = note_id
    this.errors = []
  }
  async register() {
    await this.validate()
    if(this.errors.length) return
    await RecentModel.create({ note_id: this.note_id })
  }
  async validate() {
    await this.exists()
  }
  async exists() {
    try {
      const note = await RecentModel.findOne({ note_id: this.note_id })
      if(note) this.errors.push("Esta nota ja está nos recentes")
    } catch (err) {
      console.log(err)
      return true
    }
  }
  static async getRecents(){
    return await RecentModel.find()
  }
}

module.exports = Recents