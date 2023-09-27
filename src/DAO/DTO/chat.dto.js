export default class ChatDTO {
    constructor(chat) {
        this.user = chat?.user ?? 'Unknown'
        this.message = chat?.message ?? '-'
    } 
}