const mongoose = require('mongoose');
const moment = require('moment');
const data = moment(new Date()).format('LL');

const PostSchema = new mongoose.Schema(

  {
    nome: {
      type: String,
      required: true
    },
    numero: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    messagens: {
      type: String,
      required: true
    },
    createdAt:{
      type: String,
      default: data
    }
});

module.exports = mongoose.model('emails', PostSchema);