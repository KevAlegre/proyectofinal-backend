import { deleteInactiveUsers, getUser, getUsersService } from "../services/userServices.js";

export const uploadDocuments = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user = await getUser(uid);    
        if (req.files) {
            if (req.files.document) {
                req.files.document.forEach(file => {
                   user.documents.push({name: file.originalname, reference: file.path}); 
                });
            };
            await user.save();         
        };
        res.redirect("/current")
    } catch (error) {
        console.log(error);
    };
};

export const setPremium = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user = await getUser(uid);
        if (user.documents.length === 3) {
            user.role = "premium";
            await user.save();
            
        } else {
            res.send({message: "Faltan cargar documentos"})
        };
        res.redirect("/current")
    } catch (error) {
        console.log(error);  
    };
};

export const getUsers = async (req, res) => {
    try {
        const users =  await getUsersService();
        res.send({status: "success", payload: users});
    } catch (error) {
        console.log(error);
    }
};

export const deleteUsers = async (req, res) => {
    try {
        const result = await deleteInactiveUsers();
        res.send({status: "success", message: result});
    } catch (error) {
        console.log(error);
    }
};