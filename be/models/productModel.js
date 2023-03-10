import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Product = db.define('product', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
}, {
    freezeTableName: true
});

export default Product;

// Fungsi untuk membuat tabel produk jika tidak terdapat di database
(async () => {
    await db.sync();
}) ();

// step 3