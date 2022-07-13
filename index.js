// node server for Geekchat

const io = require('socket.io')(8080)
const users = {}

io.on('connections', socket => {
    socket.on('new-user-joined', name => {
        console.log("new user", name);
        users[socket.id] = name;
        socket.broadcast.emit("user-joined")
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: user[socket.id] })
    });
})