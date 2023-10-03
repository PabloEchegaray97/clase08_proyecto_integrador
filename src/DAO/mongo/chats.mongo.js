import ChatModel from './models/chat.model.js'

export default class Chat {
    getChats = async () => {
        return await ChatModel.find().lean().exec()
    }
    getChat = async (id) => {
        return await ChatModel.findOne({_id: id})
    }
    createChat = async (chat) => {
        return await ChatModel.create(chat)
    }
}

