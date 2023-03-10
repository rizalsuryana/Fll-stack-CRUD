import { Sequelize } from "sequelize";
import db from '../config/dataBase.js';

const {DataTypes} = Sequelize;

const User = db.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING
},{
    freezeTableName:true
});

export default User;

// fungsi untuk mengenerate table jika table user tdk tdpt di db

(async ()=>{
    await db.sync();
}) ();