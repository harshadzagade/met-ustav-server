const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Institute = require('../models/Institute');
const Category = require('../models/Category');
require('dotenv').config();

exports.registerUser = [
  check('firstName').isLength({ min: 3, max: 50 }).withMessage('First name must be between 3 and 50 characters'),
  check('middleName').isLength({ min: 3, max: 50 }).withMessage('Middle name must be between 3 and 50 characters'),
  check('lastName').isLength({ min: 3, max: 50 }).withMessage('Last name must be between 3 and 50 characters'),
  check('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 4, max: 4 }).withMessage('Password must be between 8 and 128 characters'),
  check('role').isIn(['HOE', 'Student', 'Staff', 'Coordinator', 'Volunteer', 'Trustee', 'User']).withMessage('Invalid role'),
  check('type').isIn(['Student', 'Staff']).withMessage('Invalid type. Please select Student or Staff'),
  check('rollNo').isLength({ min: 1, max: 10 }).withMessage('Roll number must be between 1 and 10 characters'),
  check('instituteId').isInt().withMessage('Invalid institute ID'),
  check('phoneNo').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 characters'),
  check('categoryId').isInt().withMessage('Invalid category ID'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { 
      firstName, 
      middleName, 
      lastName, 
      gender, 
      email, 
      password, 
      role, 
      type,
      rollNo, 
      instituteId, 
      phoneNo, 
      categoryId 
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const newUser = await User.create({
        firstName,
        middleName,
        lastName,
        gender,
        email,
        password: hashedPassword,
        role,
        type,
        rollNo,
        instituteId,
        phoneNo,
        categoryId,
      });

      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error creating user' });
    }
  },
];

exports.loginUser = [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 4, max: 4 }).withMessage('Password must be between 4 and 4 characters'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ msg: 'Invalid password' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });

      res.json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error logging in user' });
    }
  },
];

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Category, as: 'Category' }, { model: Institute, as: 'Institute' }], 
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error getting users' });
  }
};


exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);  
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error getting user' });
  }
};

exports.updateUser = [
  check('name').isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),
  check('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 8, max: 128 }).withMessage('Password must be between 8 and 128 characters'),
  check('role').isIn(['Participant', 'Admin']).withMessage('Invalid role'),
  check('type').isIn(['Student', 'Staff']).withMessage('Invalid type'),
  check('grNo').isLength({ min: 5, max: 10 }).withMessage('GR number must be between 5 and 10 characters'),
  check('phoneNo').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 characters'),

  check('categoryId').isInt().withMessage('Invalid category ID'),
  check('instituteId').isInt().withMessage('Invalid institute ID'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const { name, gender, email, password, role, type, grNo, phoneNo, categoryId, instituteId } = req.body;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      user.name = name;
      user.gender = gender;
      user.email = email;
      user.role = role;
      user.type = type;
      user.grNo = grNo;
      user.phoneNo = phoneNo;
      user.categoryId = categoryId;
      user.instituteId = instituteId;

      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error updating user' });
    }
  },
];

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await user.destroy();
    res.json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error deleting user' });
  }
};