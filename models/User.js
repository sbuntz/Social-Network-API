const { Schema, model } = require('mongoose');

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thoughts'
        }
      ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'friends'
        }
    ]
  },
  {
    toJSON: {
        virtuals: true,
      },
      id: false,
    }
);

//friend count
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })
  

const User = model('user', userSchema);

module.exports = User;
