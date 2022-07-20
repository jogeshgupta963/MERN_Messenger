import User from '../models/User.js'
import Chat from '../models/Chat.js'

// @route   POST /chat
// @desc    create a new chat
// @access  Private
async function accessChat(req, res) {
  try {
    const { userId } = req.body
    if (!userId) {
      return res.json('user id  not found')
    }
    var isChat = await Chat.findOne({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate('users', '-password')
      .populate('latestMessage')

    isChat = await User.populate(isChat, {
      path: 'latestMessage.sender',
      select: 'name,pic,email',
    })
    if (isChat) {
      return res.json(isChat)
    }
    const chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
    }
    const chat = await Chat.create(chatData)

    const fullChat = await Chat.findOne({ _id: chat._id }).populate(
      'users',
      '-password',
    )

    return res.json(fullChat)
  } catch (err) {
    res.json(err.mesage)
  }
}
//@route   GET /chat
//@desc    get all chats of the user
//@access  Private
async function fetchChatsOfUser(req, res) {
  try {
    var data = await Chat.find({
      users: {
        $elemMatch: { $eq: req.user._id },
      },
    })
      .populate('users', '-password')
      .populate('latestMessage')
      .populate('groupAdmin', '-password')
      .sort({ updatedAt: -1 })
    data = await User.populate(data, {
      path: 'latestMessage.sender',
      select: 'name,pic,email',
    })

    res.json(data)
  } catch (err) {
    res.json(err.message)
  }
}

// @route   POST /chat/group
// @desc    create a new group chat
// @access  Private
async function createGroupChat(req, res) {
  try {
    if (!req.body.users || !req.body.name) {
      return res.json('fill all fields')
    }
    var users = JSON.parse(req.body.users)
    if (users.length < 2) {
      return res.json('group chat cant be creaeted with 2 users')
    }

    users.push(req.user)

    const grpChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    })

    const fullGroupChat = await Chat.findOne({
      _id: grpChat._id,
    })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')

    res.json(fullGroupChat)
  } catch (err) {
    res.json(err.mesage)
  }
}
// @route   POST /chat/group/rename
// @desc    rename a group chat
// @access  Private
async function renameGroupChat(req, res) {
  const { chatId, chatName } = req.body

  const chat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
    .populate('users', '-password')
    .populate('groupAdmin', '-password')

  res.json(chat)
}

// @route   POST /chat/group/add
// @desc    add a user to a group chat
// @access  Private
async function addToGroup(req, res) {
  try {
    const { chatId, userId } = req.body
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true },
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password')

    if (!chat) return res.json('chat not found')
    res.json(chat)
  } catch (err) {
    res.json(err.message)
  }
}

// @route   POST /chat/group/remove
// @desc    remove a user from a group chat
// @access  Private
async function removeFromGroup(req, res) {
  try {
    const { chatId, userId } = req.body
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true },
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password')

    if (!chat) return res.json('chat not found')
    res.json(chat)
  } catch (err) {
    res.json(err.message)
  }
}

async function getChatById(req, res) {
  try {
    const { id } = req.params
    const chat = await Chat.findById(id)
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
    if (!chat) return res.json('chat not found')
    res.json(chat)
  } catch (err) {
    res.json(err.message)
  }
}

export {
  accessChat,
  fetchChatsOfUser,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
  getChatById,
}
