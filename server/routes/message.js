import express from 'express'
import { getAllMessagesOfChat, sendMessages } from '../controllers/message.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.route('/').post(auth, sendMessages)
router.route('/:chat_id').get(auth, getAllMessagesOfChat)

export { router }
