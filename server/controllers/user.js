import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

async function registerUser(req, res) {
  try {
    const { name, email, password, pic } = req.body

    const user = await User.findOne({ email })
    if (user) throw new Error('user already exists')
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const newUser = await User.create({ ...req.body })
    if (!newUser) throw new Error('Something went wrong!!')

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
    })
    res.cookie('JWT', token, {
      expiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
    })

    res.json({
      status: 'success',
      msg: 'User registered successfully',
      data: newUser,
    })
    // res.json(newUser)
  } catch (err) {
    res.json({
      status: 'error',
      msg: err.message,
    })
  }
}
async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw new Error('User not found')
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
      throw new Error('Invalid password')
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
    })

    res.cookie('JWT', token, {
      expiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
    })

    res.json({
      status: 'success',
      msg: 'User logged in successfully',
      data: user,
    })
  } catch (err) {
    res.json({
      status: 'error',
      msg: err.message,
    })
  }
}
async function getAllUsers(req, res) {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json(err)
  }
}

export { registerUser, loginUser, getAllUsers }
