import { Sequelize } from "sequelize";

const db = new Sequelize('image_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;

// step 2