import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import Psychologist from './models/Psychologist.cjs';
import Patient from './models/Patient.cjs';
import Role from './models/Role.cjs';

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json(errors);
      if (req.body.isPsychologist) {
        const candidateEmail = await Psychologist.findOne({ email: req.body.email });
        if (candidateEmail) return res.status(400).json({ message: 'User with this email already registered' });
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
        const candidateName = await Patient.findOne({ nickname: req.body.nickname });
        if (candidateName) return res.status(400).json({ message: 'User with this nickname already registered' });
        const candidateEmail = await Patient.findOne({ email: req.body.email });
        if (candidateEmail) return res.status(400).json({ message: 'User with this email already registered' });
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
    } catch (e) {
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      const adminRole = new Role({ value: 'ADMIN' });
      await adminRole.save();
      res.json('server work');
    } catch (e) {}
  }
}

export default new authController();
