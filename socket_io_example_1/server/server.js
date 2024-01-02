const { instrument } = require('@socket.io/admin-ui');

const io = require('socket.io')(3000, {
	cors: {
		origin: ["http://localhost:8080", "https://admin.socket.io"],
	},
});

io.on('connection', (socket) => {
	console.log(socket.id);

	socket.on('custom-event', (number, string, object) => {
		console.log(number, string, object);
	});

	// broadcast means everyone except for yourself
	socket.on('send-message', (message, room) => {
		if(room == ''){ // broadcast to everyone
			// io.emit('receive-message', message);
			socket.broadcast.emit('receive-message', message);
			console.log(message);
		}
		else{ // broadcast to specific room
			// socket.broadcast.to(room).emit('receive-message', message);
			socket.to(room).emit('receive-message', message);
		}
	});

	socket.on('join-room', (room, callback) => {
		socket.join(room);
		callback(`Joined ${room}`);
	});
});

instrument(io, {auth: false});