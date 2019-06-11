const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

// Virtual field
userSchema
  .virtual("password")
  .set(function(pass) {
    // Create temporary variable called _password
    this._password = pass;
    // Generate a timestamp
    this.salt = uuidv1();
    // EncryptPassword()
    this.hashed_password = this.encryptPassword(pass);
  })
  .get(function() {
    return this._password;
  });

// Methods
userSchema.methods = {
  encryptPassword: function(pass) {
    if (!pass) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(pass)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  }
};

module.exports = mongoose.model("Users", userSchema);
