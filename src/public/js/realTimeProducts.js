const socket = io();

function sendDataCreate(email) {
    const data = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        price: document.getElementById("price").value,
        status: true,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        owner: email
    };
    socket.emit("newProduct", data);
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("code").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("category").value = "";
};

function sendDataDelete(email) {
    const data = {
        productId: document.getElementById("delete-id").value,
        email: email
    };
    socket.emit("deleteProduct", data);
    document.getElementById("delete-id").value = "";
};