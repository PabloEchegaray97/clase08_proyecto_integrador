import ChatDTO from '../DAO/DTO/chat.dto.js'

export default class ChatRepository {
    constructor(dao) {
        this.dao = dao
    }
    getChats = async () => {
        return await this.dao.getChats()
    }
    getChat = async (id) => {
        return await this.dao.getChat(id)
    }
    createChat = async (chat) => {
        const newChat = new ChatDTO(chat)
        return await this.dao.createChat(newChat)
    }
}