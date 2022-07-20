import express from 'express'
import { auth } from '../middleware/auth.js'

import {
  accessChat,
  fetchChatsOfUser,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
  getChatById,
} from '../controllers/chat.js'

const router = express.Router()

router.route('/').post(auth, accessChat).get(auth, fetchChatsOfUser)
router.route('/:id').get(auth, getChatById)
router.route('/group').post(auth, createGroupChat)

router.route('/group/rename').put(auth, renameGroupChat)
router.route('/group/add').put(auth, addToGroup)
router.route('/group/remove').put(auth, removeFromGroup)

export { router }
