const { Schema, Types } = require('mongoose');
const moment = require('moment')

// Schema for reactions
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: { 
      type: String,
      required: true,
      maxlength: 280,
    },
    username: { 
      type: String,
      required: true,
    },
    createdAt: { 
      type: Date, 
      default: Date.now,
      get: (date) => moment(date).format('DD MMM YYYY, HH:mm'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);

module.exports = reactionSchema;