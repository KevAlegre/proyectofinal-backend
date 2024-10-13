export const registerUser = (req, res) => {
    res.redirect("/login");
};

export const failRegister = (req, res) => {
    res.send({error: "Fail to register user"});
};

export const loginUser = (req, res) => {
    try {
        if(!req.user) return res.status(400).send("Fill all the fields");
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            cart: req.user.cart,
            role: req.user.role
        };
        if (req.session.user.role === "admin") {
            res.redirect("/admindashboard?page=1");
        } else if(req.session.user.role === "premium") {
            res.redirect("/realtimeproducts?page=1");
        } else {
            res.redirect("/products?page=1");

        };
    } catch (error) {
        res.status(500).send("Error to login user");
        req.logger.error(error);
    }; 
};

export const failLogin = (req, res) => {
    res.send({error: "Fail to login user"})
};

export const logoutUser = (req, res) => {
    req.session.destroy((error) => {
        if(error) {
            return res.status(500).send("Error al cerrar sesión");
        }
        res.redirect("/login");
    });
};