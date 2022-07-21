import Chat from '../models/Chat.js'
import Message from '../models/Message.js'
import User from '../models/User.js'

// @route   POST /message/
// @desc    send message
// @access  private

async function sendMessages(req, res) {
  try {
    const { content, chatId } = req.body
    if (!content || !chatId) {
      throw new Error('invalid data')
    }
    let newMessage = {
      sender: req.user._id,
      content,
      chat: chatId,
    }
    let message = await Message.create(newMessage)
    message = await message.populate('sender', 'name pic')
    message = await message.populate('chat')
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name pic email',
    })
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message,
    })
    res.json(message)
  } catch (err) {
    res.json(err.message)
  }
}

async function getAllMessagesOfChat(req, res) {
  try {
    const { chat_id } = req.params
    const messages = await Message.find({ chat: chat_id })
      .populate('sender', 'name pic email')
      .populate('chat')
    res.json(messages)
  } catch (err) {
    res.json(err.message)
  }
}

export { sendMessages, getAllMessagesOfChat }
