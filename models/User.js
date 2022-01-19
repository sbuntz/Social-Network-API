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
    // thoughts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'thoughts',
    //   },
    // ],
    // friends: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'friends',
    //   },
    // ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// // Create a virtual property to display the number of friends a user has
// userSchema
//   .virtual('friendCount')
//   .get(function () {
//     return this.friends.length;
//   })
  

const User = model('user', userSchema);
module.exports = User;
