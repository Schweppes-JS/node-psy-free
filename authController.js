import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import Psychologist from './models/Psychologist.cjs';
import Patient from './models/Patient.cjs';
import Role from './models/Role.cjs';
import { secret } from './config.js';

const getAccessToken = (id, role) => jwt.sign({ id, role }, secret, { expiresIn: '24h' });

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json(errors);
      if (req.body.isPsychologist) {
        const psychologistEmail = await Psychologist.findOne({ email: req.body.email });
        if (psychologistEmail) return res.status(400).json({ message: 'User with this email already registered' });
        const psychologistRole = await Role.findOne({ value: 'PSYCHOLOGIST' });
        const psychologist = new Psychologist({
          password: bcrypt.hashSync(req.body.password, 7),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          roles: [psychologistRole.value]
        });
        await psychologist.save();
        return res.status(200).json(psychologist);
      } else {
        const patientName = await Patient.findOne({ nickname: req.body.nickname });
        if (patientName) return res.status(400).json({ message: 'User with this nickname already registered' });
        const patientEmail = await Patient.findOne({ email: req.body.email });
        if (patientEmail) return res.status(400).json({ message: 'User with this email already registered' });
        const patientRole = await Role.findOne({ value: 'PATIENT' });
        const patient = new Patient({
          password: bcrypt.hashSync(req.body.password, 7),
          nickname: req.body.nickname,
          email: req.body.email,
          roles: [patientRole.value]
        });
        await patient.save();
        return res.status(200).json(patient);
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error', errors: e });
    }
  }

  async login(req, res) {
    try {
      Promise.race([Patient.findOne({ email: req.body.email }), Psychologist.findOne({ email: req.body.email })]).then((user) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          return res.json({ token: getAccessToken(user._id, user.roles) });
        } else return res.status(400).json({ message: 'Email or password is incorect' });
      });
    } catch (e) {
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
    } catch (e) {
      res.status(400).json({ message: 'Get all user error' });
    }
  }
}

export default new authController();
