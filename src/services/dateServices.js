const newDate = new Date();

export const createAt = () => {
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();
    const second = newDate.getSeconds();
    return `${day}/${month}/${year} - ${hour}:${minute}:${second}`
};