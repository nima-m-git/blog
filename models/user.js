const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
    },
    password: {
      type: String,
      minlength: 5,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
});
  
// Virtual for user url
UserSchema.virtual("url").get(() => "/user/" + this._id);

module.exports = mongoose.model("User", UserSchema);
  