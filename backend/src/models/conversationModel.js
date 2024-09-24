const mongoose = require('mongoose');
const { Schema } = require("mongoose");


const Conversation = mongoose.model(
    "Conversation",
    new Schema(
      {
        user: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        response: {
          type: String,
          required: true,
        },
        intent: {
          type: String,
        },
      },
      { timestamps: true } 
    )
  );

  module.exports = Conversation;
