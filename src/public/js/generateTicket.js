const socket = io();

function generateTicket(email) {
    const prices = [];
    const getProducts = document.getElementsByClassName("product");
    const parsedProducts = Array.from(getProducts);
    parsedProducts.map(prod => {
        const price = prod.querySelector(".price").innerHTML.split(" ")[1].split(/[$\s]+/)[1];
        const parsedPrice = Number(price);
        prices.push(parsedPrice)
    });
    socket.emit("dataTicket", prices, email)
};