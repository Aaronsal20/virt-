const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  category: {
    type: Number, required: true
  },

  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});


module.exports = mongoose.model('User', userSchema);
