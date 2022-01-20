const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: { type: String, 
      trimmed: true,
      unique: true, 
      required: true },
    email: { type: String, 
      match: /^([\da-z_.-]+)@([\da-z.-]+)\.([a-z]{2,6})$/,
      unique: true, 
      required: true },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// // countfriends of the user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  })
  

const User = model('user', userSchema);
module.exports = User;
