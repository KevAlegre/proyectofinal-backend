const socket = io();

function userHandler(email, event) {
    const btnId = event.target.id;
    const data = {
        email,
        action: btnId
    };
    socket.emit("userHandler", data);
};