import express from 'express'

const router = express.Router()

import { registerUser, loginUser } from '../controllers/user.js'

router.route('/').post(registerUser)

router.route('/login').post(loginUser)

export { router }
