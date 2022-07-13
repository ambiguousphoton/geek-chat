const socket = io.connect('http://localhost:3001');

const form = document.getElementById('send-container')
const messageInput = document.getElementById('inp')
const messageContainer = document.querySelector('.container')


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(message);
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
}

const name = prompt("Enter your name");

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.messag}: ${data.user}`, 'left')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

console.log("hello");