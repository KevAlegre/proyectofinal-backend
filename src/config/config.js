import dotenv from "dotenv";

dotenv.config();

export default {
    environment: process.env.ENVIRONMENT,
    port: process.env.PORT,
    mongo_secret_key: process.env.MONGO_SECRET_KEY,
    mongo_url: process.env.MONGO_URL,
    admin_mail: process.env.ADMIN_MAIL,
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
    persistence: process.env.PERSISTENCE,
    gmail_user: process.env.GMAIL_USER,
    gmail_app_pass: process.env.GMAIL_APP_PASS
};