import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    maxlength: 255,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  pic: {
    type: 'String',
    default:
      'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  },
})

userSchema.set('timeStamps', true)

const User = mongoose.model('User', userSchema)

export default User
