const { Schema, model } = require('mongoose');

const reactionSchema = require('./Reaction');
const moment = require('moment')

//Schema for thoughts

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => moment(date).format('DD MMM YYYY, HH:mm'),
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema],
   },
  {
    toJSON: {
      getters: true,
    },
  }
);

//count the reactions to the thoughts
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
