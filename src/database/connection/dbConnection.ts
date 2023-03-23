const { Sequelize } = require("sequelize");
const config = require("../config/dbconfig");

const sequelize = new Sequelize(
    config.development.db,
    config.development.user,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
        pool: {
            max: config.development.pool.max,
            min: config.development.pool.min,
            acquire: config.development.pool.acquire,
            idle: config.development.pool.idle,
        },
    }
);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

testConnection();

export default sequelize;
