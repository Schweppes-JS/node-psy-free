const { Schema, model } = require('mongoose');

const Patient = new Schema(
  {
    nickname: { type: String, unique: true, requeired: true },
    password: { type: String, unique: false, requeired: true },
    email: { type: String, unique: true, requeired: true },
    isActivated: { type: Boolean, default: false },
    roles: [{ type: String, ref: 'Role' }],
    activationLink: { type: String }
  },
  { versionKey: false }
);

module.exports = model('Patient', Patient);
