const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    firstName: {
      type: String,
      maxlength: 50,
    },
    lastName: {
      type: String,
      maxlength: 50,
    },
    dateCreated: {
        type: Date,
        default: new Date.now(),
    },
});
  
// Virtual for user url
UserSchema.virtual("url").get(() => "/user/" + this._id);

module.exports = mongoose.model("User", UserSchema);
  