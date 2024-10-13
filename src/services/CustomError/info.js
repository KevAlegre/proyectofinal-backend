export const error_invalidProductsParams = (product) => {
    return `One or more parameters are invalid or incomplete.
    Required:
    * title: as a String. Received ${product.title}
    * description: as a String. Received ${product.description}
    * price: as a Number. Received ${product.price}
    * code: as a String. Received ${product.code}
    * stock: as a Number. Received ${product.stock}
    * category: as a String. Received ${product.category}
    * thumbnail: as a String or Undefined. Received ${product.thumbnail}`;
};

export const error_invalidUserParams = (user) => {
    return `One or more parameters are invalid or incomplete.
    Required:
    * first_name: as a String. Received ${user.first_name}
    * last_name: as a String. Received ${user.last_name}
    * email: as a String. Received ${user.email}
    * age: as a String. Received ${user.age}`;
};