const { Schema, model } = require('mongoose');

const Psychologist = new Schema(
  {
    firstName: { type: String, unique: false, requeired: true },
    lastName: { type: String, unique: false, requeired: true },
    password: { type: String, unique: true, requeired: true },
    email: { type: String, unique: true, requeired: true },
    roles: [{ type: String, ref: 'Role' }]
  },
  { versionKey: false }
);

module.exports = model('Psychologist', Psychologist);
