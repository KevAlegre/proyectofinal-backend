const socket = io();

function sendMail() {
    const data = document.getElementById("email").value;
    socket.emit("sendMail", data);
}

function resetPassword(token) {
    const data = {
        newPass: document.getElementById("newPass").value,
        repeatPass: document.getElementById("repeatPass").value,
        token: token
    };
    socket.emit("resetPassword", data);
};