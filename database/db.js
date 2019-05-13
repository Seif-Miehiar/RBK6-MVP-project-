const mongoose = require('mongoose');

const Schema = mongoose.Schema

const users = new Schema({
    username: { type: String, required: true, min: 8, max: 20 },
    password: { type: String, required: true, min: 8, max: 16, match: /(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/	 },
    email: {type: String, required: true},
    date: { type: Date, default: Date.now },
  });

  let Repo = mongoose.model('Repo', users);

  module.exports.Repo = Repo;
