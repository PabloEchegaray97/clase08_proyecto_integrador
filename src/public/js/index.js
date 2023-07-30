const socket = io();
const chatBox = document.getElementById('chatbox');
let user = localStorage.getItem('user') || '';

if (!user) {
    Swal.fire({
        title: 'Auth',
        input: 'text',
        text: 'Set username',
        inputValidator: value => {
            return !value.trim() && 'Please write a username'
        },
        allowOutsideClick: false
    }).then(result => {
        user = result.value;
        document.getElementById('username').innerHTML = user
        localStorage.setItem('user', user)
        
        socket.emit('new', user)
    })
} else {
    document.getElementById('username').innerHTML = user
    socket.emit('new', user)
}

//enviar mensajes
chatBox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        const message = chatBox.value.trim()
        if(message.length > 0) {
            socket.emit('message', {
                user,
                message
            })
            chatBox.value = ''
        }
    }
})
//recibir mensajes
socket.on('logs', data => {
    const divLogs = document.getElementById('logs');
    let messages = '';
    data.forEach(message => {
        messages += `<p><i>${message.user}</i>: ${message.message}</p>`
    });

    divLogs.innerHTML = messages;
})