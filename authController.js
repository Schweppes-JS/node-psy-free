import bcrypt from 'bcryptjs';

import Psychologist from './models/Psychologist.cjs';
import Patient from './models/Patient.cjs';
import Role from './models/Role.cjs';

class authController {
  async registration(req, res) {
    try {
      if (req.body.isPsychologist) {
      } else {
        const candidate = await Patient.findOne({ nickname: req.body.nickname });
        console.log(candidate);
        if (candidate) return res.status(400).json({ message: 'User with this nickname already registered' });
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
      res.status(400).json({ message: 'Registration error' });
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
