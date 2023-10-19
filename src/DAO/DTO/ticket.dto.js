export default class TicketDTO {
    constructor(ticket) {
        this.code = this.generateCode()
        this.purchase_datetime = ticket?.purchase_datetime ?? new Date() ;
        this.amount = ticket?.amount ?? 0;
        this.purchaser = ticket?.purchaser ?? 'Unknown';
        this.products = ticket.products ?? []
    }
    generateCode = () =>{
        const code = Math.random().toString(36).substring(2,10)
        console.log(code)
        return code
    }
}


