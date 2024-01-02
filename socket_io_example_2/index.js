const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(express.static(path.resolve('./public')));

server.listen(9000, () => {
	console.log(`Server started at PORT: 9000`);
});

app.get('/', (request, response) => {
	return response.sendFile("/public/index.html");
});

const io = new Server(server);

io.on("connection", (socket) => { // socket means client
	console.log('A new user has connected', socket.id);

	socket.on('user-message', (message) => {
		console.log("A new user message", message);
		io.emit("message", message);
	});
});