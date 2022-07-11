import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

async function auth(req, res, next) {
  const token = req.cookies.JWT
  try {
    if (!token) {
      return res.status(401).json({
        status: 'error',
        msg: 'You are not logged in',
      })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await mongoose.model('User').findById(decoded._id)
    if (!user) {
      return res.status(401).json({
        status: 'error',
        msg: 'You are not logged in',
      })
    }
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({
      status: 'error',
      msg: 'You are not logged in',
    })
  }
}

export { auth }
