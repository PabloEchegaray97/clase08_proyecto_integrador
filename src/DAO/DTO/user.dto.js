

export default class UserDTO {
    constructor(user) {
        this.email = user?.email ?? 'null';
        this.first_name = user?.first_name ?? this.extractUserName(user?.email);
        this.last_name = user?.last_name ?? ''
        this.age = user?.age ?? 0
        this.role = user?.role ?? 'user'
        this.cart = user?.cart
        this.password = user?.password
    }
    

    extractUserName(email) {
        const partesCorreo = (email ?? 'null').split('@');
        return partesCorreo[0];
    }
}