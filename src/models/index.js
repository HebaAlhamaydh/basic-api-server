"use strict";
require('dotenv').config();

// Connects to our database depending on the URI as an environmental variable
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require("sequelize");

const Food = require('./food');
const Clothes = require('./clothes');



let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl :{require: true,rejectUnauthorized: false},
                native: true
            }
        } : {};

// we are going to use this to connect to Postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

module.exports = {
    db: sequelize,
    Food: Food(sequelize, DataTypes),
    Clothes: Clothes(sequelize, DataTypes)
};