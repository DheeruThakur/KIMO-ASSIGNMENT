const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  name: String,
  text: String,
  ratings: [Number]
});

const courseSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  date: Number,
  description: String,
  domain: [String],
  chapters: [chapterSchema]
});

module.exports = mongoose.model('Course', courseSchema);
