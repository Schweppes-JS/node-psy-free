const { Schema, model } = require('mongoose');

const Patient = new Schema(
  {
    nickname: { type: String, unique: true, requeired: true },
    password: { type: String, unique: false, requeired: true },
    email: { type: String, unique: true, requeired: true },
    roles: [{ type: String, ref: 'Role' }]
  },
  { versionKey: false }
);

module.exports = model('Patient', Patient);
