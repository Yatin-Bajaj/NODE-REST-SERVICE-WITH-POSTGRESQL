require("dotenv").config();

module.exports = {
    development: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        db: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
        url: process.env.PGURL,
        dialect: "postgres",
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
};
