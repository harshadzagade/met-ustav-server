const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Institute = require("../models/Institute");
require("dotenv").config();

exports.registerUser = [
  check("firstName")
    .isLength({ min: 3, max: 50 })
    .withMessage("First name must be between 3 and 50 characters"),
  check("lastName")
    .isLength({ min: 3, max: 50 })
    .withMessage("Last name must be between 3 and 50 characters"),
  check("gender")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),
  check("email").isEmail().withMessage("Invalid email"),
  check("password")
    .isLength({ min: 4, max: 4 })
    .withMessage("Password must be between 8 and 128 characters"),
  check("rollNo")
    .isLength({ min: 1, max: 10 })
    .withMessage("Roll number must be between 1 and 10 characters"),
  check("instituteId").isInt().withMessage("Invalid institute ID"),
  check("phoneNo")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 characters"),
  check("role")
    .isIn([
      "HOE",
      "Participant",
      "Staff",
      "Coordinator",
      "Volunteer",
      "Trustee",
      "User",
    ])
    .withMessage("Invalid role"),
  check("type")
    .isIn(["Student", "Staff"])
    .withMessage("Invalid type. Please select Student or Staff"),

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
      pg_class,
      instituteId,
      phoneNo,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
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
        pg_class,
        instituteId,
        phoneNo,
      });

      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error creating user" });
    }
  },
];

exports.loginUser = [
  check("email").isEmail().withMessage("Invalid email"),
  check("password")
    .isLength({ min: 4, max: 4 })
    .withMessage("Password must be between 4 and 4 characters"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ msg: "Invalid password" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res.json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error logging in user" });
    }
  },
];

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Institute, as: "Institute" },
      ],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error getting users" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error getting user" });
  }
};

exports.updateUser = [
  check("name")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
  check("gender")
    .optional()
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),
  check("email").optional().isEmail().withMessage("Invalid email"),
  check("password")
    .optional()
    .isLength({ min: 4, max: 4 })
    .withMessage("Password must be between 4 and 4 characters"),
  check("role")
    .optional({ nullable: true, checkFalsy: true })
    .isIn([
      "HOE",
      "Student",
      "Staff",
      "Coordinator",
      "Volunteer",
      "Trustee",
      "User",
    ])
    .withMessage("Invalid role"),
  check("type")
    .optional()
    .isIn(["Student", "Staff"])
    .withMessage("Invalid type"),
  check("rollNo")
    .optional()
    .isLength({ min: 1, max: 10 })
    .withMessage("Roll number must be between 1 and 10 characters"),
  check("phoneNo")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 characters"),
  check("instituteId").optional().isInt().withMessage("Invalid institute ID"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const updateData = { ...req.body };

      // Hash password if it's included in the request body
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      // Update user data dynamically with the keys in `req.body`
      Object.entries(updateData).forEach(([key, value]) => {
        if (value !== "") {
          user[key] = value;
        }
      });

      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error updating user" });
    }
  },
];

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    await user.destroy();
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error deleting user" });
  }
};


// forget password with email and otp verification
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // generate otp
    const otp = Math.floor(1000 + Math.random() * 9000);
    // send otp to user email
    await sendEmail(email, otp);
    user.otp = otp;
    await user.save();
    res.json({ msg: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error sending OTP" });
  }
};