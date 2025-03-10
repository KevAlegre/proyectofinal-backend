import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import userModel from "../DAO/mongo/models/userModel.js";
import cartModel from "../DAO/mongo/models/cartModel.js";
import { createHash, isValidPassword } from "../utils.js";
import config from "./config.js";

const LocalStrategy = local.Strategy;

const initializePassport =  () => {
    passport.use("register", new LocalStrategy(
        {passReqToCallback: true, usernameField: "email"}, async (req, username, password, done) => {
            const {first_name, last_name, email, age} = req.body;
            let role;
            let resetToken;
            let tokenExpiration;

            try {
                if (email === config.admin_mail) {
                    role = "admin"
                };

                const user = await userModel.findOne({email: username});

                if (user) {
                    console.log("El usuario ya existe");
                    return done(null, false);
                };
                const cart = await cartModel.create({})
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: cart,
                    resetToken,
                    tokenExpiration,
                    role
                };

                const result = await userModel.create(newUser);

                return done(null, result);
            } catch (error) {
                return done("Error al obtener el usuario" + error);
            };
        }
    ));

    passport.use("login", new LocalStrategy(
        {usernameField: "email"}, async (username, password, done) => {
            try {
                const user = await userModel.findOne({email: username});
                if (!user) {
                    console.log("El usuario no existe");
                    return done(null, false, {message: "User not found"});
                }
                if(!isValidPassword(user, password)) return done(null, false, {message: "Incorrect password"});
                user.last_connection = new Date();
                await user.save();
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("github", new GitHubStrategy({
        clientID: config.github_client_id,
        clientSecret: config.github_client_secret,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            const user = await userModel.findOne({email: profile._json.email});
            if (!user) {
                const newsUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.last_name,
                    email: profile._json.email,
                    age: 18,
                    password: "",
                    role: "user"
                };
                const result = await userModel.create(newsUser);
                done(null, result);
            } else {
                done(null, user);
            }            
        } catch (error) {
            return done(error);
        }

    }
    
    ));


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;