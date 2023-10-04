const socket = io();
const chatBox = document.getElementById('chatbox');
let user = localStorage.getItem('user') || '';

socket.emit('newMessage', null); 


socket.on('logs', data => {
    const divLogs = document.getElementById('logs');
    let messages = '';
    data.forEach(message => {
        messages += `<p class="mb-1"><strong>${message.user}</strong>: ${message.message}</p>`;
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

