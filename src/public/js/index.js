const socket = io();
const chatBox = document.getElementById('chatbox');
let user = localStorage.getItem('user') || '';

if (!user) {
    Swal.fire({
        title: 'Auth',
        input: 'text',
        text: 'Set username',
        inputValidator: value => {
            return !value.trim() && 'Please write a username';
        },
        allowOutsideClick: false
    }).then(result => {
        user = result.value;
        document.getElementById('username').innerHTML = user;
        localStorage.setItem('user', user);
        socket.emit('newMessage', user); 
    });
} else {
    document.getElementById('username').innerHTML = user;
    socket.emit('newMessage', user); 
}


socket.on('logs', data => {
    const divLogs = document.getElementById('logs');
    let messages = '';
    data.forEach(message => {
        messages += `<p><i>${message.user}</i>: ${message.message}</p>`;
    });

    divLogs.innerHTML = messages;
});


document.getElementById('chatForm').addEventListener('submit', (event) => {
    event.preventDefault(); 
    const message = chatBox.value.trim();
    if (message.length > 0) {
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user,
                message
            })
        })
        .then(response => response.text())
        .then(() => {
            chatBox.value = '';
        })
        .catch(error => {
            console.error('Error sending the message:', error);
        });
    }
});
